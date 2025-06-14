import { lazy, Suspense } from "react";
import { usePopularMovies } from "@/hooks/usePopularMovies.ts";
import { useAuth } from "@/hooks/useAuth";
import HeroBanner from "@/views/Home/HeroBanner";
import FeaturedToday from "@/views/Home/FeaturedToday";
import AdvancedSearchBanner from "@/views/Home/AdvancedSearchBanner";
import AppHeader from "@/components/ui/AppHeader.tsx";
import Footer from "@/components/navigation/Footer";

// Use Vite's dynamic import syntax
const LazyTopTenMovies = lazy(() => import("@/views/Home/TopTenMovies"));
const LazyPopularCelebrities = lazy(() => import("@/views/Home/PopularCelebrities"));
const LazyTopTenSeries = lazy(() => import("@/views/Home/TopTenSeries"));

const HomePage = () => {
    const { isLoading, error } = usePopularMovies();
    const { user } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="min-h-screen">
            {!user && <HeroBanner />}

            <div className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <AppHeader title="Featured Today" />
                    <FeaturedToday />
                </section>

                <section className="mb-12">
                    <AppHeader title="Top 10 on IMDb This Week" />
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyTopTenMovies />
                    </Suspense>
                </section>

                <section className="mb-12">
                    <AdvancedSearchBanner />
                </section>

                <section className="mb-12">
                    <AppHeader title="Most Popular Celebrities" />
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyPopularCelebrities />
                    </Suspense>
                </section>

                <section className="mb-12">
                    <AppHeader title="Explore TV Shows" />
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <Suspense fallback={<div>Loading top series...</div>}>
                            <LazyTopTenSeries />
                        </Suspense>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
