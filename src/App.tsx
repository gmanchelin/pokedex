import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

function App() {
  return (
    <>
      <div>TOTO</div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="page/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
