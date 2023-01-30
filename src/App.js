import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./Components/LoginScreen";
import SignupScreen from "./Components/SignupScreen";
import EmiCalScreen from "./Components/EmiCalScreen";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className='homeDiv'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path='/login' element={<LoginScreen/>}/>
          <Route exact path="/signup" element={<SignupScreen/>}/>
          <Route exact path='emicalculator'  element={<EmiCalScreen/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
