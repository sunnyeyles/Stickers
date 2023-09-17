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

export default function App() {
  return (
    <MainTheme>
      <MainNavBar links={navBarItems} />
      <LoginForm />
    </MainTheme>
  );
}
