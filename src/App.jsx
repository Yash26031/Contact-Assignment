import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import CreateContact from "./pages/CreateContact";
import EditContact from "./pages/EditContact";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add-contact" element={<CreateContact />} />
        <Route path="/contact/:index" element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
