import { useState } from 'react'

function MenuItem({name, desc, price, available}) {
  const [count, setCount] = useState(0);
  function handleAddClick() {
    // alert(`Added ${name} to the cart`)
    setCount(count + 1);
  }
  function handleRemoveClick() {
    // alert(`Added ${name} to the cart`)
    setCount(count - 1);
  }
return (<div className="menu-item">
      <h3>{name}</h3>
      <p>{desc}</p>
      <p className="price">${price.toFixed(2)}</p>
      {
      count>0 && 
      <p class="order-count">In your order: {count}</p>
      }
      {available ? (
        <button onClick={handleAddClick}>Add to Order</button>
      ) : (
        <p className="sold-out">Sold out</p>
      )}
      {
      count>0 && 
      <button onClick={handleRemoveClick}>Remove from Order</button> 
      }
      
    </div>
);
};

export default MenuItem;