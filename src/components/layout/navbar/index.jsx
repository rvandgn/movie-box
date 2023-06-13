import './styles.scss';
import {Search} from "assets";
import {useCallback, useEffect, useState} from "react";
import {getMovieDetails, searchMovies} from "services";

function Navbar({state, dispatch}) {
    const [view, setView] = useState(false); // search box preview

    const searchGetMovies = useCallback(() => {
        searchMovies(state.value).then(res => {
            dispatch({
                type: 'UPDATE_SEARCH_VIEW',
                value: res.results.slice(0, 5)
            })
        })
    }, [dispatch, state.value]);


    useEffect(() => {
        searchGetMovies();
    }, [dispatch, searchGetMovies, state.value])

    const onSubmit = event => {
        event.preventDefault();
        setView(true);
        dispatch({
            type: 'UPDATE_VALUE', value: event.target.value.replaceAll(' ', '%20')
        });
    }

    const clickHandle = id => {
        setView(false);
        getMovieDetails(id).then(result => {
            dispatch({
                type: 'UPDATE_MOVIE_DETAILS', value: {
                    name: result.title,
                    date: result.release_date,
                    tagline: result.tagline,
                    overview: result.overview,
                    backdropPath: result.backdrop_path,
                    posterPath: result.poster_path,
                    language: result.original_language,
                    genres: result.genres,
                    productionCompanies: result.production_companies,
                    voteAverage: result.vote_average
                }
            })
        })
    }

    return (<header>
        <h2>Movie Box</h2>
        <form>
            <img src={Search} alt={'search icon'}/>
            <input type={'text'} placeholder={'Search'} onKeyPress={event => event.key === 'Enter' && onSubmit(event)}/>
            <div className={'search-view'} style={!view ? {display: "none"} : {display: 'block'}}>
                {state.searchBoxView[0]?.map(item => <div key={item.id}
                                                                      onClick={() => clickHandle(item.id)}>
                    {item.backdrop_path !== null &&
                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={'item'}/>}
                    <span>{item.title}</span>
                </div>)}
            </div>
        </form>
    </header>);
}

export default Navbar;
