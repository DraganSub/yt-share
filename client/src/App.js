import { MainLayout } from "./layouts";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App;
