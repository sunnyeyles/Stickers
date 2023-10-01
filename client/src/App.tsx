import { MainTheme } from "./styles/MainTheme";
import { Login } from "../src/pages/login/Login";
import { MainNavBar } from "./components/navBar/MainNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/register/Register";

const navBarItems = [
  {
    link: "#women",
    label: "Women",
  },
  {
    link: "#men",
    label: "Men",
  },
  {
    link: "#kids",
    label: "Kids",
  },
];

export default function App() {
  return (
    <MainTheme>
      <BrowserRouter>
        <MainNavBar links={navBarItems} />
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </MainTheme>
  );
}
