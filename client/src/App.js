import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App;
