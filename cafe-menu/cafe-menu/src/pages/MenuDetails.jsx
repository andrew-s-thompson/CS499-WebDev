import { useParams, Link } from 'react-router'

export default function MenuDetails({menu}) {
    const { itemId } = useParams();
    const item = menu.find(
    item => String(item.id) === itemId);
    if (!item) {
        return (
            <div>
                <h2>Menu Item Not Found</h2>
                <Link to='/menu' end>Back to Menu</Link>
            </div>
        );

    }
    return (
        <div>
            <h2>Menu Item's Info</h2>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Item:</strong> {item.description}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p>
                <strong>Availability:</strong>{' '}
            {item.available ? 'Available' : 'Unavailable'}
            </p>
            <Link to="/menu">Back to Menu</Link>
        </div>
    )
}