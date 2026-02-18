import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Cinema App</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
