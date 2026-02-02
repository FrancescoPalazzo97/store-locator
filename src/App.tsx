export const App = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🏪 Store Locator
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            Benvenuto in Store Locator
          </h2>
          <p className="text-gray-600 mb-4">
            Trova i punti vendita più vicini a te.
          </p>
          <div className="flex gap-2">
            <button className="btn btn-primary">
              Cerca negozi
            </button>
            <button className="btn btn-secondary">
              Vedi mappa
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500">
          © 2026 Store Locator
        </div>
      </footer>
    </div>
  )
}
