import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StoreDetailsPage } from "./pages/StoreDetailsPage";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/store/:id" element={<StoreDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
