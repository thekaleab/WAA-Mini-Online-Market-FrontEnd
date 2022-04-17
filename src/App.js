import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import AppRoutes from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (
    <div className="app">
      <ToastContainer position="bottom-right" autoClose={5000} closeOnClick theme="colored" />
      <Router>
        <Navbar />
        {AppRoutes}
      </Router>
    </div>
  );
}

export default App;
