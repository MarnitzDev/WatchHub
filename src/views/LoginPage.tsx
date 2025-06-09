import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Login / Sign Up
                </h1>
                <button
                    onClick={() => loginWithRedirect()}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Log In / Sign Up with Auth0
                </button>
            </div>
        </div>
    );
};

export default LoginPage;