import './App.scss';
import {BrowserRouter} from "react-router-dom";
import StartPage from "./components/pages/StartPage/StartPage";

function App() {
  return (
      <BrowserRouter>
          <StartPage/>
      </BrowserRouter>
  );
}

export default App;
