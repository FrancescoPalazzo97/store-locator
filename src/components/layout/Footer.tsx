export const Footer = () => {
    return (
        <footer className="bg-dark-surface border-t border-dark-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 text-center text-dark-text-secondary">
                © {new Date().getFullYear()} Store Locator
            </div>
        </footer>
    )
}