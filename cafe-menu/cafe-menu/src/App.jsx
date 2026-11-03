import MenuItem from './components/MenuItem.jsx';
import { menu } from './data.js'
import Footer from './components/Footer.jsx';
import OrderForm from './components/OrderForm.jsx'
import { useState } from 'react';

export default function App() {
  const [state, toggle] = useState(0)
  const [order, setOrder] = useState({});
  const drinkArray = menu.filter(item => item.category === 'drink');
  function addToOrder(id) {
    setOrder(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }
  function removeFromOrder(id) {
    if (order[id] > 0) {
      setOrder(prev => ({ ...prev, [id]: (prev[id] ?? 0) - 1 }));
    }
    else {
      alert(id + " could not be removed")
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
  const displayDrinks = drinkArray.map(item =>
    
    <MenuItem
      key={item.id}
      name={item.name}
      desc={item.description}
      price={item.price}
      available={item.available}
      count={order[item.id] ?? 0}
      onAdd={() => addToOrder(item.id)}
      onRemove={() => removeFromOrder(item.id)}
    />
  )
  const displayMenu = menu.map(item =>
    <MenuItem 
      key={item.id}
      name={item.name}
      desc={item.description}
      price={item.price}
      available={item.available}
      count={order[item.id] ?? 0}
      onAdd={() => addToOrder(item.id)}
      onRemove={() => removeFromOrder(item.id)}
    />
   )
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
    <h1>Campus Cafe</h1>
    <p className="tagline">Fresh coffee between classes</p>
    <h2>Today's Menu</h2>
    {state ? 
    (<button onClick={toggleMenu}>Show Full Menu</button>):
    (<button onClick={toggleMenu}>Show Drinks</button>) }
    {state ? (displayDrinks) : (displayMenu)}
    <OrderForm totalItems={totalItems} onPlaceOrder={placeOrder} />
    <Footer />
  </div>
  );
}