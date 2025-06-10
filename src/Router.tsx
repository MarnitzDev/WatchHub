import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./views/HomePage";
import MoviesPage from "@/views/Movies/MoviesPage.tsx";
import MovieDetailPage from "./views/Movies/MovieDetailPage.tsx";
import MovieCreditsPage from "./views/Movies/MovieCreditsPage";
import SeriesPage from "./views/Series/SeriesPage";
import SeriesDetailPage from "./views/Series/SeriesDetailPage.tsx";
import SeriesCreditsPage from "./views/Series/SeriesCreditsPage";
import PersonDetailPage from "./views/PersonDetailPage.tsx";
import AdvanceSearchPage from "./views/AdvanceSearchPage.tsx";
import ListsPage from "./views/ListsPage";
import ProfilePage from "./views/ProfilePage";
import NotFoundPage from "./views/NotFoundPage";
import LoginPage from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCallback from "./components/AuthCallback";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "movies", element: <MoviesPage /> },
            { path: "movie/:id", element: <MovieDetailPage /> },
            { path: "movie/:id/credits", element: <MovieCreditsPage /> },
            { path: "series", element: <SeriesPage /> },
            { path: "series/:id", element: <SeriesDetailPage /> },
            { path: "series/:id/credits", element: <SeriesCreditsPage /> },
            { path: "person/:id", element: <PersonDetailPage /> },
            { path: "search", element: <AdvanceSearchPage /> },
            { path: "lists", element: <ListsPage /> },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <LoginPage /> },
            { path: "auth/callback", element: <AuthCallback /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
