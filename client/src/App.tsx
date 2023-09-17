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
export default function App() {
  return (
    <MainTheme>
      <MainNavBar links={navBarItems} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
        </Routes>
      </BrowserRouter>
    </MainTheme>
  );
}
