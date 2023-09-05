import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import GameCard from "./GameCard";


const GamesPage = ({games, addItemToCart}) => {
    let {gameGenre} = useParams();
    const filteredGames = games.filter((game) => {
        for(let i = 0; i < game.genres.length; i++) {
            if (game.genres[i].name.toLowerCase() === gameGenre) {
                return true;
            }
        }
        return false;
    })

    return (
        <div className="flex flex-col mt-10 max-w-[1200px]">
        <h1 className="font-semibold text-xl">{filteredGames.length} {filteredGames.length === 1 ? " Game" : " Games"} Found</h1>
        <hr className="border-neutral-500 border-1 w-full mb-4"></hr>
        <div className="flex flex-wrap justify-center gap-3 ">        
            {filteredGames.map((game) => 
            <GameCard key={game.id} title={game.name} image={game.background_image} id={game.id} addItemToCart={addItemToCart}></GameCard>)}
        </div>
        </div>
    )
}

GamesPage.propTypes = {
    addItemToCart: PropTypes.func,
    games: PropTypes.array
}

export default GamesPage;