import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate("/");
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Processing authentication...</div>;
};

export default AuthCallback;
