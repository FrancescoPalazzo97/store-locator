import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const DefaultLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
