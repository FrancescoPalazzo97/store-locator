import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="bg-dark-surface border-b border-dark-border">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 text-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-dark-text hover:text-primary transition-colors"
                >
                    Store Locator
                </Link>
            </div>
        </header>
    )
}