import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mdiStar } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Arrow} from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";

const pickColor = (title) => {
    let color = '';
    switch(title) {
        case 'exceptional':
            color = '#83c63c';
            break;
        case 'recommended':
            color = '#5375da';
            break;
        case 'meh':
            color = '#f9ae46';
            break;
        case 'skip':
            color = '#fa4250';
            break;
        default:
            color = '#151515';
    }

    return color;
} 

const useGameInfo = (id) => {
    const [gameInfo, setGameInfo] = useState(null);
    const [screenshots, setScreenshots] = useState(null);
    const [trailers, setTrailers] = useState(null);

    useEffect(() => {

        fetch(`https://api.rawg.io/api/games/${id}?key=96459fc2695a4ad8b053552c09d0c6d4`, { mode: "cors" })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setGameInfo(response)
        })
        .catch((error) => console.log(error));

        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=96459fc2695a4ad8b053552c09d0c6d4`, { mode: "cors" })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setScreenshots(response)
        })

        fetch(`https://api.rawg.io/api/games/${id}/movies?key=96459fc2695a4ad8b053552c09d0c6d4`, { mode: "cors" })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setTrailers(response)
        })

    }, [id])

    return {gameInfo, screenshots, trailers};
}


const GamePage = () => {
    const {gameId} = useParams();
    const { gameInfo, screenshots, trailers } = useGameInfo(gameId);

    const plugins = [new Arrow()];

    return (
        <div className="flex flex-col gap-3">
            <Flicking
            align='center'
            defaultIndex={0}
            circular={true}
            plugins={plugins}
            >
            {trailers &&
                trailers.results.map((item) => {
                    return <div key={item.id} className="mx-1">
                        <video  width="320" height="240" controls className="lg:w-[1024px] lg:h-[600px] sm:w-[500px] sm:h-[320px] w-[360px] h-[200px] shadow">
                                <source src={item.data.max} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                            </div>})}
            {screenshots &&
                screenshots.results.map((item) => {
                        return <div key={item.id} className="mx-1">
                            <img  className="lg:w-[1024px] lg:h-[600px] sm:w-[500px] sm:h-[320px] w-[360px] h-[200px] shadow" src={item.image} alt=""/>
                            </div>
                    })}
            {(!screenshots && !trailers) &&
                        <div>
                            <img src={"/placeholder.gif"} alt="placeholder" className="lg:w-[1024px] lg:h-[600px] sm:w-[500px] sm:h-[320px] w-[360px] h-[200px] shadow"/>
                            </div>
                    }
                <ViewportSlot>
                    <span className="flicking-arrow-prev is-thin"></span>
                    <span className="flicking-arrow-next is-thin"></span>
                </ViewportSlot>
            </Flicking>
            {gameInfo?
            <>
            <div>
                <h1>{gameInfo.name}</h1>
                <p>
                    <Icon path={mdiStar} size={1} />{gameInfo.metacritic}/100 | {gameInfo.esrb_rating.name}
                </p>
            </div>
            <div>
                <h2>$59.99</h2>
                <button>                        
                    <Icon path={mdiCartPlus} size={1} color={'white'}/> Add to cart</button>
            </div>
            <div className="flex flex-wrap">
                <section>
                    <h3>
                        Description
                    </h3>
                    <p>
                        {gameInfo.description_raw}
                    </p>
                </section>
                <section>
                    <h3>
                        Game details
                    </h3>
                    <ul>
                        <li>
                            <h4>Genre:</h4>
                            <p>
                                {gameInfo.genres.map((genre) => genre.name).join(', ')}
                            </p>
                        </li>
                        <li>
                            <h4>Release date:</h4>
                            <p>
                                {gameInfo.released}
                            </p>
                        </li>
                        <li>
                            <h4>Platform:</h4>
                            <p>
                                {gameInfo.parent_platforms.map((item) => item.platform.name).join(', ')} 
                            </p>
                        </li>
                        <li>
                            <h4>Developers:</h4>
                            <p>
                                {gameInfo.developers.map((dev) => dev.name).join(', ')} 
                            </p>
                        </li>
                        {
                            gameInfo.website !== "" &&
                            <li>
                                <h4>Website:</h4>
                                <a href={`${gameInfo.website}`}>Official Site</a>
                            </li>
                        }
                        <li>
                            <h4>Tags:</h4>
                            <p>
                                {gameInfo.tags.map((tag) => tag.name).join(', ')}
                            </p>
                        </li>
                    </ul>
                </section>
            </div>
            <section className="p-4 mb-10">
                <h3 className="text-xl font-semibold mb-1">
                    Ratings
                </h3>
                <hr className="mb-4 border-neutral-400 border-[1px] rounded"/>
                <div className="flex justify-between">
                    {
                        gameInfo.ratings.map((rating) => {
                            return (
                            <div key={rating.id} className="max-w-[200px] drop-shadow">
                                <CircularProgressbarWithChildren value={rating.percent} background backgroundPadding={6}
                                styles={buildStyles({pathColor: '#FFF',  trailColor: "transparent",
                                backgroundColor: pickColor(rating.title),})}>
                                        <p className='font-semibold text-xl text-white' >
                                            {rating.percent}%
                                            </p>
                                        <p className='font-semibold text-xl text-white'>
                                            {rating.title}
                                            </p>
                                </CircularProgressbarWithChildren>
                            </div>
                                )
                        })
                    }
                    
                </div>
            </section>
        
        </>
        :
        <p>Loading...</p> 
        }
        </div>
    )
}

export default GamePage;