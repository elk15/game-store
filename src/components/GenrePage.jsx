import { useParams } from "react-router-dom";

const GamesPage = () => {
    let {gameGenre} = useParams();

    return (
        <div >        
            {gameGenre}
        </div>
    )
}

export default GamesPage;