import { useState, useEffect } from "react";

const useGameData = () => {
    const [carouselData, setCarouselData] = useState(null);

    const today = new Date(Date.now());
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const formattedPast = `${sixMonthsAgo.getFullYear()}-${(sixMonthsAgo.getMonth() + 1).toString().padStart(2, '0')}-${sixMonthsAgo.getDate().toString().padStart(2, '0')}`;

    useEffect(() => {
        // fetch carousel data
        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&dates=${formattedPast},${formattedToday}&page_count=5&metacritic=85,100&ordering=metacritic`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setCarouselData(response.results)
        })

    }, [])

    return {carouselData};
}

export default useGameData;