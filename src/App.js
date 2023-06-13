import Navbar from "components/layout/navbar";
import {useCallback, useEffect, useReducer} from "react";
import Main from "components/layout/main";
import {getMovieDetails} from "services";

function reducer(state, action) {
    return {
        'UPDATE_VALUE': {...state, value: action.value},
        'UPDATE_SEARCH_VIEW': {...state, searchBoxView: [action.value]},
        'UPDATE_MOVIE_DETAILS': {...state, movieDetails: action.value}
    }[action.type]
}

function App() {
    const [state, dispatch] = useReducer(reducer, {
        value: 'venom', searchBoxView: [], movieDetails: {
            name: '',
            date: '',
            tagline: '',
            overview: '',
            backdropPath: null,
            posterPath: null,
            language: '',
            genres: [],
            productionCompanies: [],
            voteAverage: 0
        }
    });

    const defaultMovieDetails = useCallback(id => {
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
    }, [dispatch]);

    useEffect(() => {
        defaultMovieDetails(335983); // Venom ID
    }, [dispatch, defaultMovieDetails]);

    return (<div className={'app'}>
            {state.movieDetails.backdropPath !== null &&
                <img src={`https://image.tmdb.org/t/p/original${state.movieDetails.backdropPath}`} alt={'backdrop'}
                     id={'backdrop'}/>}
            <Navbar state={state} dispatch={dispatch}/>
            <Main state={state}/>
        </div>);
}

export default App;