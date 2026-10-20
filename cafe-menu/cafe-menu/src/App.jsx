import MenuItem from './components/MenuItem.jsx';
import Footer from './components/Footer.jsx';
export default function App() {
return (
  <div className="page">
    <h1>Campus Cafe</h1>
    <p className="tagline">Fresh coffee between classes</p>
    <h2>Today's Menu</h2>
    <MenuItem 
      name="Iced Coffee"
      desc="Espresso over ice with cold milk"
      price={4.50}
    />
    <MenuItem
      name="Blueberry Muffin"
      desc="Baked fresh every morning"
      price={3.25}
     />
    <MenuItem 
      name="Veggie Wrap"
      desc="Hummus, spinach, and roasted peppers"
      price={6.75}
    />
    <Footer />
  </div>
  );
}