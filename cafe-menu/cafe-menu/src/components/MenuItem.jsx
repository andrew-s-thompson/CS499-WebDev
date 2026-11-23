import { useState } from 'react'
import { Link } from 'react-router'

function MenuItem({id, name, desc, price, available, count, onAdd, onRemove}) {
return (<div className="menu-item">
      <h3>{name}</h3>
      <p>{desc}</p>
      <p className="price">${price.toFixed(2)}</p>
      <p><Link to={`/menu/${id}`}>View Details</Link></p>
      {
      count>0 && 
        <p className="order-count">In your order: {count}</p>      }
      {available ? (
        <button onClick={onAdd}>Add to Order</button>
      ) : (
        <p className="sold-out">Sold out</p>
      )}
      {
      count>0 && 
      <button onClick={onRemove}>Remove from Order</button>
      }
      
    </div>
);
};

export default MenuItem;