import { MainTheme } from "./styles/MainTheme";
import { LoginForm } from "./components/loginForm/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <MainTheme>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
        </Routes>
      </BrowserRouter>
    </MainTheme>
  );
}
