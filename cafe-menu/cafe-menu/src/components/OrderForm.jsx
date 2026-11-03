import {useState} from 'react';

function OrderForm({ totalItems, onPlaceOrder }) {
    const [customerName, setCustomerName] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        onPlaceOrder(customerName)
        setCustomerName("")

    }
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="customer-name">Customer name</label>
        <input required type="text" id="customer-name" value={customerName} onChange={(e) =>setCustomerName(e.target.value)}/>
        <p>Items in your order: {totalItems}</p>
        <button type="submit" disabled={totalItems === 0}>Place Order</button>
        </form>
    )
}

export default OrderForm;