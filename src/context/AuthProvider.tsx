import React, { useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { AuthContext, AuthContextType, UserProfile } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
        useAuth0();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchUserProfile();
        }
    }, [isAuthenticated, user]);

    const fetchUserProfile = async () => {
        if (!user) return;

        try {
            const token = await getAccessTokenSilently();
            // Here you would typically fetch the user profile from your API
            // For now, we'll create a profile based on Auth0 user info
            const profile: UserProfile = {
                id: user.sub || "",
                username: user.nickname || "",
                full_name: user.name || "",
                avatar_url: user.picture || "",
            };
            setUserProfile(profile);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const contextValue: AuthContextType = {
        user: user as User | null,
        loading: isLoading,
        userProfile,
        fetchUserProfile,
        isAuthenticated,
        loginWithRedirect,
        logout: () => logout({ returnTo: window.location.origin }),
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
