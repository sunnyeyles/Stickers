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
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useAppSelector } from './hooks/hooks'
import { PersistLogin } from './app/features/auth/persistLogin'
import { Products } from './pages/products/Products'
import { Container } from '@mantine/core'
import { Item } from './pages/item/Item'
import { Cart } from './pages/cart/Cart'
import { PaymentConfirmation } from './pages/paymentConfirmation/PaymentConfirmation'
import { Contact } from './pages/contact/Contact'

// const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
//   return isAuthenticated ? children : <Navigate to="/" replace />
// }

export default function App() {
  return (
    <MainTheme>
      <Container size="xl">
        <Router>
          <MainNavBar />
          <Routes>
            {/* landing page */}
            <Route path="/" element={<Dashboard />} />

            {/* public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            <Route element={<PersistLogin />}>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/products" element={<Products />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />

              {/* private */}

              <Route path="/profile" element={<Profile />} />
              <Route
                path="/order-summary"
                element={<ShippingInfoOrderPage />}
              />
              <Route path="/confirmation" element={<PaymentConfirmation />} />
            </Route>

          </Routes>

          <Footer />
        </Router>
      </Container>
    </MainTheme>
  )
}
