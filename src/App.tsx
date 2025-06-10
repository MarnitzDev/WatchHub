import * as React from "react";
import { Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "@/components/navigation/Navbar.tsx";
import AutoScrollToTop from "@/components/AutoScrollToTop.tsx";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function App() {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: `${window.location.origin}/auth/callback`,
            }}
        >
            <React.Fragment>
                <Navbar />
                <main className="mx-auto min-h-screen">
                    <AutoScrollToTop />
                    <Outlet />
                </main>
                <ScrollToTopButton />
            </React.Fragment>
        </Auth0Provider>
    );
}

export default App;
