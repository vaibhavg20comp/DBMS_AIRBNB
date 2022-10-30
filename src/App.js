import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
          exact
        >
        </Route>
        <Route
          path="/home"
          element={<Home />}
          exact
        >
        </Route>
        <Route
          path="/signup"
          element={<SignUp />}
          exact
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
