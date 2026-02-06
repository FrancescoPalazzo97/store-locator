import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomPage";
import { StoreDetailsPage } from "./pages/StoreDetailsPage";

export const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Header />

        <main>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/store/:id" element={<StoreDetailsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
