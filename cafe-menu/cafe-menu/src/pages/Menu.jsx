import MenuItem from '../components/MenuItem.jsx';
import OrderForm from '../components/OrderForm.jsx'
import CafeInspiration from '../components/CafeInspiration.jsx'
import { useSearchParams } from 'react-router';

export default function Menu({menu, order, addToOrder, removeFromOrder, totalItems, placeOrder}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') ?? 'drink';
    const visibleItems = category === 'all' ? menu : menu.filter(item => item.category === 'drink');
    const displayMenu = visibleItems.map(item =>
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          desc={item.description}
          price={item.price}
          available={item.available}
          count={order[item.id] ?? 0}
          onAdd={() => addToOrder(item.id)}
          onRemove={() => removeFromOrder(item.id)}
        />
    )

    return(
        <>
            <h2>Today's Menu</h2>
            <select value={category} onChange={item => setSearchParams({ category: item.target.value })}>
                <option value="drink">Drinks Only</option>
                <option value="all">All Items</option>
            </select>
            {displayMenu}
            <OrderForm totalItems={totalItems} onPlaceOrder={placeOrder} />
            <CafeInspiration />
        </>
    )
}
