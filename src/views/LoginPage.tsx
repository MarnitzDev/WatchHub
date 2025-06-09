import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, error, user } = useAuth0();
    const navigate = useNavigate();
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        console.log("Auth0 states:", { isLoading, isAuthenticated, error, user });

        const timer = setTimeout(() => {
            setLocalLoading(false);
            console.log("Local loading timeout reached");
        }, 10000); // 10 seconds timeout

        if (!isLoading) {
            clearTimeout(timer);
            setLocalLoading(false);
            console.log("Auth0 loading completed");
            if (isAuthenticated && user) {
                console.log("User is authenticated, navigating to home");
                navigate("/");
            }
        }

        return () => clearTimeout(timer);
    }, [isLoading, isAuthenticated, navigate, error, user]);

    if (localLoading || isLoading) {
        return <div className="min-h-screen flex justify-center items-center">Loading... (Auth0 Loading: {isLoading.toString()})</div>;
    }

    if (error) {
        return <div className="min-h-screen flex justify-center items-center">Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Login / Sign Up
                </h1>
                <button
                    onClick={() => {
                        console.log("Login button clicked");
                        loginWithRedirect().catch(err => console.error("Login error:", err));
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Log In / Sign Up with Auth0
                </button>
            </div>
        </div>
    );
};

export default LoginPage;