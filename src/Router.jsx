import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import GamesPage from "./components/GamesPage";
import useGameData from "./GameData";
import { useState } from "react";

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
        setCart(...cart, e.currentTarget.dataset.id)
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root cart={cart} setCart={setCart} allGames={allGames}/>,
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