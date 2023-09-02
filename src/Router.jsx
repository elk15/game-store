import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import GamesPage from "./components/GamesPage";
import useGameData from "./GameData";
import { useState } from "react";

const doesItContainGame = (cart, id) => {
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].id == id) {
            return true;
        }
    }
    return false;
}

const Router = () => {
    let allGames = [];
    const uniqueIds = [];
    const [cart, setCart] = useState([]);
    const {carouselData, newReleasesData, hotPicksData, bestSellingData, upcomingData} = useGameData();
    if (carouselData) {
        allGames = [...allGames, ...carouselData];
    }
    if (newReleasesData) {
        allGames = [...allGames, ...newReleasesData];
    }
    if (hotPicksData) {
        allGames = [...allGames, ...hotPicksData];
    }
    if (bestSellingData) {
        allGames = [...allGames, ...bestSellingData];
    }
    if (upcomingData) {
        allGames = [...allGames, ...upcomingData];
    }

    allGames = allGames.filter((game) => {
        const isDuplicate = uniqueIds.includes(game.id);
        
        if(!isDuplicate) {
            uniqueIds.push(game.id);
            return true;
        }
        return false;
    })

    const addItemToCart = (e) => {
        const gameId = e.currentTarget.dataset.id;
        if (!doesItContainGame(cart, gameId)) {
            const game = allGames.find((game) => game.id == gameId);
            setCart([...cart, game]);
        }
    }

    const removeFromCart = (e) => {
        const gameId = e.currentTarget.dataset.id;
        const newCart = cart.filter((game) => game.id != gameId);
        setCart(newCart);
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root cart={cart} allGames={allGames} addItemToCart={addItemToCart} removeFromCart={removeFromCart}/>,
            errorElement: <ErrorPage />,
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        {index: true, element: <Home 
                            addItemToCart={addItemToCart} 
                            carouselData={carouselData} 
                            newReleasesData={newReleasesData}
                            hotPicksData={hotPicksData}
                            bestSellingData={bestSellingData}
                            upcomingData={upcomingData}/>},
                        {
                            path: "games/:gameGenre",
                            element: <GamesPage />
                        },
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />;
}

export default Router;