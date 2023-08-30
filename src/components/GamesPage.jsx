import { useParams } from "react-router-dom";

const GamesPage = () => {
    let {gameGenre} = useParams();

    return (
        <h1>        {gameGenre}
        </h1>
    )
}

export default GamesPage;