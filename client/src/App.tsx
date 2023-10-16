import { MainTheme } from './styles/MainTheme'
import { Login } from '../src/pages/login/Login'
import { MainNavBar } from './components/navBar/MainNavBar'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Register } from './pages/register/Register'
import { ShippingInfoOrderPage } from './pages/shippingInfoOrderSummaryPage/ShippingInfoOrderPage'
import { Footer } from './components/footer/Footer'
import { Profile } from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/hooks'
import { PersistLogin } from './app/features/auth/persistLogin'

const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

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
      <Router>

        <MainNavBar links={navBarItems} />

        <Routes>

          {/* landing page */}
          <Route path="/" element={<Dashboard />} />

          {/* public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private */}
          <Route element={<PersistLogin />}>

            <Route
              path="/order-summary"
              element={(
                <PrivateWrapper>
                  <ShippingInfoOrderPage />
                </PrivateWrapper>
              )}
            />
            <Route
              path="/profile"
              element={(
                <PrivateWrapper>
                  <Profile />
                </PrivateWrapper>
              )}
            />

          </Route>

        </Routes>

        <Footer />

      </Router>
    </MainTheme>
  )
}
