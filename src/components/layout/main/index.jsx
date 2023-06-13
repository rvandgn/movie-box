import './styles.scss';
import {Star} from "assets";

function Main({state}) {
    const date = {
        day: state.movieDetails.date.slice(8, 10),
        month: state.movieDetails.date.slice(5, 7),
        year: state.movieDetails.date.slice(0, 4)
    }

    return (
        <div className={'main-container'}>
            <div className={'poster'}>
                { state.movieDetails.posterPath !== null && <img src={`https://image.tmdb.org/t/p/original/${state.movieDetails.posterPath}`} alt={'poster'} /> }
            </div>

            <div className={'details'}>
                <h1 className={'title'}>
                    {state.movieDetails.name} <span>
                        ({date.year})
                    </span>
                </h1>
                <div className={'facts'}>
                    <span className={'lang'}>{state.movieDetails.language}</span>
                    <span className={'release'}>{date.day}/{date.month}/{date.year}</span>
                    &bull;
                    { state.movieDetails.genres.map(item => <span className={'genres'} key={item.id}>{item.name}</span>)}
                    &bull;
                    <span className={'vote'}>
                        {state.movieDetails.voteAverage}
                        <img src={Star} alt={'star icon'} />
                    </span>
                </div>
                <div className={'tagline'}>{state.movieDetails.tagline}</div>
                <div className={'overview'}>
                    <h3>Overview</h3>
                    {state.movieDetails.overview}
                </div>
                <div className={'production_companies'}>
                    <h3>Production Companies</h3>
                    <div>
                        { state.movieDetails.productionCompanies.map(item => <div className={'company'} key={item.id}>
                            {item.name}
                        </div> )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;