import { MainTheme } from './styles/MainTheme'
import { Login } from '../src/pages/login/Login'
import { MainNavBar } from './components/navBar/MainNavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Register } from './pages/register/Register'
import { ShippingInfoOrderPage } from './pages/shippingInfoOrderSummaryPage/ShippingInfoOrderPage'
import { Footer } from './components/footer/Footer'

const navBarItems = [
  {
    link: '#women',
    label: 'Women',
  },
  {
    link: '#men',
    label: 'Men',
  },
  {
    link: '#kids',
    label: 'Kids',
  },
]

export default function App() {
  return (
    <MainTheme>
      <BrowserRouter>
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-summary" element={<ShippingInfoOrderPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MainTheme>
  )
}
