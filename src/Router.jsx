import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import GamesPage from "./components/GamesPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        {index: true, element: <Home />},
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