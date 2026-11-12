import OrderForm from '../components/OrderForm.jsx'
import CafeInspiration from '../components/CafeInspiration.jsx'

export default function Menu({state, toggleMenu,displayDrinks, displayMenu, totalItems, placeOrder}) {
    return(
        <>
            <h2>Today's Menu</h2>
            {state ? 
            (<button onClick={toggleMenu}>Show Full Menu</button>):
            (<button onClick={toggleMenu}>Show Drinks</button>) }
            {state ? (displayDrinks) : (displayMenu)}
            <OrderForm totalItems={totalItems} onPlaceOrder={placeOrder} />
            <CafeInspiration />
        </>
    )
}