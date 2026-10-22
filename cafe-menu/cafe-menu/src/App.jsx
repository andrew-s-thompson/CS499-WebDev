import MenuItem from './components/MenuItem.jsx';
import { menu } from './data.js'
import Footer from './components/Footer.jsx';
import { useState } from 'react';

export default function App() {
  const [state, toggle] = useState(0)
  const drinkArray = menu.filter(item => item.category === 'drink');
  const displayDrinks = drinkArray.map(item =>
    <MenuItem 
      key={item.id}
      name={item.name}
      desc={item.description}
      price={item.price}
      available={item.available}
    />
  )
  const displayMenu = menu.map(item =>
    <MenuItem 
      key={item.id}
      name={item.name}
      desc={item.description}
      price={item.price}
      available={item.available}
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
    <Footer />
  </div>
  );
}