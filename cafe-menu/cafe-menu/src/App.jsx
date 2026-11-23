import { menu } from './data.js'
import Footer from './components/Footer.jsx';
import OrderForm from './components/OrderForm.jsx'
import CafeInspiration from './components/CafeInspiration.jsx'
import { useState } from 'react';
import { Routes, Route, NavLink} from 'react-router';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import MenuDetails from './pages/MenuDetails.jsx'

export default function App() {
  const [order, setOrder] = useState({});
  function addToOrder(id) {
    setOrder(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }
  function removeFromOrder(id) {
    if (order[id] > 0) {
      setOrder(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
    }
    
  }
  let totalItems = 0;
  for (const id in order) {
    totalItems += order[id];
  }
  function placeOrder(customerName) {
    alert(`Order placed for ${customerName}! ${totalItems} item(s).`);
  setOrder({});
  }
  function toggleMenu() {
    if (state === 0) {
      toggle(1);
    }
    else {
      toggle(0);
    };
    return(state);
  }
return (
  <div className="page">
    <nav>
      <NavLink to="/" end>Home</NavLink>
      {' | '}
      <NavLink to="/menu">Menu</NavLink>
      {' | '}
      <NavLink to="/about">About</NavLink>
    </nav>
    <h1>Campus Cafe</h1>
    <p className="tagline">Fresh coffee between classes</p>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About /> } />
      <Route path="/menu" element={
        <Menu
          menu={menu}
          order={order}
          addToOrder={addToOrder}
          removeFromOrder={removeFromOrder}
          totalItems={totalItems}
          placeOrder={placeOrder}
        />

      } />
      <Route path="/menu/:itemId" element={<MenuDetails
        menu={menu}
      />} />
      <Route
      path="*"
      element={<h2>404 - Page Not Found</h2>}
      />

    </Routes>
    <Footer />
  </div>
  );
}