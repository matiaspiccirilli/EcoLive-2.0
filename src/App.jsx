import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/landingPage/LandingPage"; // Eliminar
import CreateProduct from './components/createProduct/CreateProduct'; //eliminar

const App = () => {
  // url general
  axios.defaults.baseURL = "http://localhost:3000/";

  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/createProduct" element={<CreateProduct/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
