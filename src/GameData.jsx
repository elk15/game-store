import { useState, useEffect } from "react";

const useGameData = () => {
    const [carouselData, setCarouselData] = useState(null);
    const [newReleasesData, setNewReleasesData] = useState(null);
    const [hotPicksData, setHotPicksData] = useState(null);
    const [bestSellingData, setBestSellingData] = useState(null);
    const [upcomingData, setUpcomingData] = useState(null);

    const [pageOne, setPageOne] = useState(null);
    const [pageTwo, setPageTwo] = useState(null);

    const today = new Date(Date.now());
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const inSixMonths = new Date(today);
    inSixMonths.setMonth(today.getMonth() + 6);

    const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const formattedPast = `${sixMonthsAgo.getFullYear()}-${(sixMonthsAgo.getMonth() + 1).toString().padStart(2, '0')}-${sixMonthsAgo.getDate().toString().padStart(2, '0')}`;
    const formattedFuture = `${inSixMonths.getFullYear()}-${(inSixMonths.getMonth() + 1).toString().padStart(2, '0')}-${inSixMonths.getDate().toString().padStart(2, '0')}`;


    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&dates=${formattedPast},${formattedToday}&page_size=5&metacritic=85,100&ordering=-metacritic`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setCarouselData(response.results)
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&dates=${formattedPast},${formattedToday}&genres=action,rpg,shooter,strategy&metacritic=65,100&page_size=8&ordering=-released`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setNewReleasesData(response.results)
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&genres=action,rpg,shooter,strategy&metacritic=75,100&page_size=8&ordering=-updated`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setHotPicksData(response.results)
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&dates=2010-01-01,${formattedToday}&genres=action,rpg,shooter,strategy&metacritic=75,100&page_size=8&ordering=-metacritic`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setBestSellingData(response.results)
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&dates=${formattedToday},${formattedFuture}&genres=action,rpg,shooter,strategy&page_size=4&ordering=released`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setUpcomingData(response.results)
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&genres=rpg,action,shooter,strategy&dates=2010-01-01,${formattedToday}&page_size=40&ordering=-metacritic`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setPageOne(response.results);
        })

        fetch(`https://api.rawg.io/api/games?key=96459fc2695a4ad8b053552c09d0c6d4&genres=rpg,action,shooter,strategy&dates=2010-01-01,${formattedToday}&page_size=40&ordering=-metacritic&page=2`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setPageTwo(response.results);
        })



    }, [])

    return {upcomingData, pageOne, pageTwo, carouselData, bestSellingData, newReleasesData, hotPicksData};
}

export default useGameData;