function MenuItem({name, desc, price}) {
return (<div className="menu-item">
      <h3>{name}</h3>
      <p>{desc}</p>
      <p className="price">${price.toFixed(2)}</p>
    </div>
);
};

export default MenuItem;