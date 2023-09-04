import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mdiStar } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="flex flex-col">
            <Flicking
            align='center'
            defaultIndex={0}
            circular={true}
            >
            {trailers &&
                trailers.results.map((item) => {
                    return <div key={item.id}>
                        <video  width="320" height="240" controls>
                                <source src={item.data.max} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                            </div>})}
            {screenshots &&
                screenshots.results.map((item) => {
                        return <div key={item.id}><img  src={item.image} alt=""/></div>
                    })}
            {(!screenshots && !trailers) &&
                        <div><img src={"/placeholder.gif"} alt="placeholder"/></div>
                    }

            </Flicking>
                {/* <Slider {...settings}>
                    {trailers &&

                        trailers.results.map((item) => {
                            return <div key={item.id}>
                                <video  width="320" height="240" controls>
                                        <source src={item.data.max} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                            </div>
                        })
                    }
                    {screenshots &&
                        screenshots.results.map((item) => {
                            return <div key={item.id}><img  src={item.image} alt=""/></div>
                        })

                    }
                    {(!screenshots && !trailers) &&
                        <div><img src="./placeholder.gif" alt="placeholder"/></div>
                    }
                </Slider> */}
            {/* {gameInfo?
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
            <section>
                <h3>
                    Ratings
                </h3>
                <div>
                    {
                        gameInfo.ratings.map((rating) => {
                            return (<CircularProgressbar key={rating.id} value={rating.percent} 
                            styles={buildStyles({pathColor: pickColor(rating.title), textColor: pickColor(rating.title)})}>
                                    <p>{rating.percent}%</p>
                                    <p>{rating.title}</p>
                                </CircularProgressbar>)
                        })
                    }
                    
                </div>
            </section>
        
        </>
        :
        <p>Loading...</p> 
        } */}
        </div>
    )
}

export default GamePage;