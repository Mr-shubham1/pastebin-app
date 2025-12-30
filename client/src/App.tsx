import "./App.css";
import { Routes , Route } from "react-router-dom";
import Createpaste from "./pages/Createpaste";
import Readpaste from "./pages/Readpaste";

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element=<Createpaste/> />
      <Route path="/paste/:id" element=<Readpaste/> />
     </Routes>
    </>
  );
}

export default App;
