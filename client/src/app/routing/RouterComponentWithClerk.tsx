import { useAppSelector } from '../../hooks/hooks'
import { selectUser } from '../features/users/userSlice'
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  BrowserRouter,
} from 'react-router-dom'
import { MainNavBar } from '../../components/navBar/MainNavBar'
import { PersistLogin } from '../features/auth/persistLogin'
import { Dashboard } from '../../pages/dashboard/Dashboard'
import { Profile } from '../../pages/profile/Profile'
import { ShippingInfoOrderPage } from '../../pages/shippingInfoOrderSummaryPage/ShippingInfoOrderPage'
import { PaymentConfirmation } from '../../pages/paymentConfirmation/PaymentConfirmation'
import { Home } from '../../pages/home/Home'
import { Login } from '../../pages/login/Login'
import { Register } from '../../pages/register/Register'
import { About } from '../../pages/about/About'
import { Contact } from '../../pages/contact/Contact'
import { Products } from '../../pages/products/Products'
import { Item } from '../../pages/item/Item'
import { Cart } from '../../pages/cart/Cart'
import { Footer } from '../../components/footer/Footer'
import { SignIn, SignUp } from '@clerk/clerk-react'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  useSession,
} from '@clerk/clerk-react'
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw 'Missing Publishable Key'
}

function ProtectedRoute() {
  const user = useAppSelector(selectUser)
  if (!user) {
    return <Navigate to="/login" replace />
  } else {
    return <Outlet />
  }
}

export function RouterComponentWithClerk() {
  return (
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
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
