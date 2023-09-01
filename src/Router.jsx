import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import GamesPage from "./components/GamesPage";
import { useState } from "react";

const Router = () => {
    const [cart, setCart] = useState([]);

    const addItemToCart = (e) => {
        setCart(...cart, e.currentTarget.dataset.id)
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root cart={cart} setCart={setCart}/>,
            errorElement: <ErrorPage />,
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        {index: true, element: <Home addItemToCart={addItemToCart}/>},
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