import { MainTheme } from './styles/MainTheme'
import { Login } from '../src/pages/login/Login'
import { MainNavBar } from './components/navBar/MainNavBar'
import { About } from './pages/about/About'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Register } from './pages/register/Register'
import { ShippingInfoOrderPage } from './pages/shippingInfoOrderSummaryPage/ShippingInfoOrderPage'
import { Footer } from './components/footer/Footer'
import { Profile } from './pages/profile/Profile'
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  BrowserRouter
} from 'react-router-dom'
import { useAppSelector } from './hooks/hooks'
import { PersistLogin } from './app/features/auth/persistLogin'
import { Products } from './pages/products/Products'
import { Container } from '@mantine/core'
import { Item } from './pages/item/Item'
import { Cart } from './pages/cart/Cart'
import { PaymentConfirmation } from './pages/paymentConfirmation/PaymentConfirmation'
import { Contact } from './pages/contact/Contact'
import { Home } from './pages/home/Home'
import { selectUser } from './app/features/users/userSlice'

function ProtectedRoute() {
  const user = useAppSelector(selectUser)
  if (!user) {
    return <Navigate to="/login" replace />
  } else {
    return <Outlet />
  }
}

export default function App() {
  return (
    <MainTheme>

      <Container size="xl">

        <BrowserRouter>

          <MainNavBar />

          <Routes>

            <Route element={<PersistLogin />}>

              {/* protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-summary" element={<ShippingInfoOrderPage />} />
                <Route path="/confirmation" element={<PaymentConfirmation />} />
              </Route>

            </Route>

              {/* public routes*/}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/cart" element={<Cart />} />


          </Routes>

          <Footer />

        </BrowserRouter>

      </Container>

    </MainTheme>
  )
}
