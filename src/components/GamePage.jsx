import { useParams } from "react-router-dom";


const GamePage = () => {
    let {gameId} = useParams();

    return <h1>My Game {gameId}</h1>
}

export default GamePage;