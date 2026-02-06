import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                    Store Locator
                </Link>
            </div>
        </header>
    )
}