import { MainTheme } from "./styles/MainTheme";
import { LoginForm } from "./components/loginForm/LoginForm";
import { MainNavBar } from "./components/navBar/MainNavBar";
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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
export default function App() {
  return (
    <MainTheme>
      <MainNavBar links={navBarItems} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<LoginForm />}/>
        </Routes>
      </BrowserRouter>
    </MainTheme>
  );
}
