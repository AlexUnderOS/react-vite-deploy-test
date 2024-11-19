import PropTypes from 'prop-types'
import './Cart.scss'
import { useState, useEffect } from 'react'

function CartLayout({ cartItems, onResetCart, setCartItems }) {
    const [totalAmount, setTotalAmount] = useState('00.00€')

    useEffect(() => {
        const total = cartItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)
        setTotalAmount(`${total}€`)
    }, [cartItems])

    const removeItem = (id, price) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && item.price === price))
        )
    }

    return (
        <div className="cart-layout">
            <div className="cart-container">
                <div className="cart-content">
                    {cartItems.map((item) => (
                        <div
                            className="cart-item"
                            key={`${item.id}-${item.size}`}
                        >
                            <img
                                className="item-icon"
                                src={item.image}
                                alt={item.name}
                            />
                            <div>
                                <h4 className="item-title">
                                    {item.name} ({item.size})
                                </h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Price:{' '}
                                    {(item.price * item.quantity).toFixed(2)} €
                                </p>
                                <button
                                    className="remove-item-btn"
                                    onClick={() =>
                                        removeItem(item.id, item.price)
                                    }
                                >
                                    <img
                                        draggable="false"
                                        src="/src/images/Group 12.svg"
                                        alt="Remove item"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="r-content">
                <p className="order-amount">
                    Order amount: <span id="orderAmount">{totalAmount}</span>
                </p>
                <button className="pay-btn">Go to pay</button>
                <button className="reset-btn" onClick={onResetCart}>
                    Reset
                </button>
            </div>
        </div>
    )
}

CartLayout.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            size: PropTypes.string.isRequired, // Здесь важно указать, что size обязательно
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
    onResetCart: PropTypes.func.isRequired,
    setCartItems: PropTypes.func.isRequired, // Передается функция для изменения состояния корзины
}

export default CartLayout
