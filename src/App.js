import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
