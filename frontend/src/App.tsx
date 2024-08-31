
// Components
import AuthForm from './Auth/AuthForm';
// import Cart from './components/Cart/Cart';
import Navbar from './components/Nav/Navbar';
import TableLayout from './components/TableLayout/TableLayout';
import OrderView from './components/OrderView/OrderView';
import ActiveOrdersView from './components/OrderView/ActiveOrdersView';
import AdminDashboard from './components/Admin/AdminDashboard';
import CheckoutView from './components/CheckoutView';

// Pages
import LandingPage from './components/pages/LandingPage';

// Store
import { useAppStore } from './store';


// Serverless
function App() {
  const { activeView } = useAppStore();
  // We need menu
  // Shopping Cart UX
  // Product Management Dashboard
  // Single Product Page
  // Carry Out
  // Delivery
  // Dine In
  // Table Management
  // Check Out with Stripe
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Shopping Cart */}
      {/* <Cart /> */}

      {/* Active View */}
      {{
        "landing": ( <LandingPage /> ),
        "signin": ( <AuthForm /> ),
        "tables": ( <TableLayout /> ),
        "order": ( <OrderView /> ),
        "product": ( <>Individual Product Page</> ),
        "orders": ( <ActiveOrdersView /> ),
        "checkout": ( <CheckoutView /> ),
        "admin": ( <AdminDashboard /> )
      }[activeView]}
    </>
  )
}

export default App;
