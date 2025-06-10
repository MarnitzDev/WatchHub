import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "@/components/navigation/Navbar.tsx";
import AutoScrollToTop from "@/components/AutoScrollToTop.tsx";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState: any) => {
        navigate(appState?.returnTo || window.location.origin);
    };

    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: `${window.location.origin}/auth/callback`,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

function App() {
    return (
        <Auth0ProviderWithNavigate>
            <React.Fragment>
                <Navbar />
                <main className="mx-auto min-h-screen">
                    <AutoScrollToTop />
                    <Outlet />
                </main>
                <ScrollToTopButton />
            </React.Fragment>
        </Auth0ProviderWithNavigate>
    );
}

export default App;
