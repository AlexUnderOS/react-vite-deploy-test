import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import MainSlideshow from '../../layouts/slideshow/main/MainSlideshowLayout.jsx'
import './Welcome.scss'
import { scrollToElement } from '../../scripts/scroll.js'
import CartLayout from '../../layouts/cart/CartLayout.jsx'
import products from '../../data/products.json'

function WelcomePage() {
    const scrollButtonRef = useRef(null)
    const orderListRef = useRef(null)
    const [cartItems, setCartItems] = useState([])

    const addToCart = (pizza, size, quantity) => {
        const priceMap = {
            S: pizza.S_size,
            M: pizza.M_size,
            L: pizza.L_size,
        }

        const newItem = {
            id: `${pizza.id}_${size}`,
            name: pizza.name,
            size,
            quantity,
            price: priceMap[size],
            image: `/src/images/food_imgs/pizzas/${pizza.imageName}`,
        }

        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find(
                (item) => item.id === newItem.id
            )
            if (existingItem) {
                return prevCartItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prevCartItems, newItem]
        })
    }

    const resetCart = () => {
        setCartItems([])
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollButton = scrollButtonRef.current
            const currentScrollY = document.documentElement.scrollTop

            if (currentScrollY <= 690) {
                const opacity = 1 - currentScrollY / 690
                scrollButton.style.opacity = opacity.toFixed(2)
                scrollButton.style.display = 'block'
            } else {
                scrollButton.style.opacity = 0
                scrollButton.style.display = 'none'
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="welcome-page">
            <MainSlideshow />
            <button
                className="scroll-to-orders sticky"
                ref={scrollButtonRef}
                onClick={() => scrollToElement(orderListRef)}
            >
                <img src="/src/images/arrow.svg" alt="Scroll" />
            </button>
            <div className="orders-container" ref={orderListRef}>
                <div className="pizza-content">
                    <h2 className="h2-1">Pizza</h2>
                    <div className="grid">
                        {products.pizzas.map((pizza) => (
                            <PizzaCard
                                key={pizza.id}
                                pizza={pizza}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <CartLayout cartItems={cartItems} onResetCart={resetCart} />
        </div>
    )
}

function PizzaCard({ pizza, onAddToCart }) {
    const [selectedSize, setSelectedSize] = useState('S')
    const [quantity, setQuantity] = useState(1)

    const getPrice = () => {
        switch (selectedSize) {
            case 'M':
                return pizza.M_size
            case 'L':
                return pizza.L_size
            default:
                return pizza.S_size
        }
    }
    const price = getPrice()

    return (
        <div className={`content ${pizza.available ? '' : 'disabled'}`}>
            <img
                className="food-img"
                src={`/src/images/food_imgs/pizzas/${pizza.imageName}`}
                alt={`Pizza ${pizza.name}`}
            />
            <h3>{pizza.name}</h3>
            <p>{pizza.ingredients}</p>
            {pizza.available ? (
                <>
                    <div className="sizes">
                        <button
                            className={selectedSize === 'S' ? 'selected' : ''}
                            onClick={() => setSelectedSize('S')}
                        >
                            S
                        </button>
                        <button
                            className={selectedSize === 'M' ? 'selected' : ''}
                            onClick={() => setSelectedSize('M')}
                        >
                            M
                        </button>
                        <button
                            className={selectedSize === 'L' ? 'selected' : ''}
                            onClick={() => setSelectedSize('L')}
                        >
                            L
                        </button>
                    </div>
                    <div className="bottom">
                        <input
                            className="quantity-input"
                            type="number"
                            min={1}
                            max={15}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                        />
                        <button
                            className="add-to-cart-btn"
                            onClick={() =>
                                onAddToCart(
                                    pizza,
                                    selectedSize,
                                    quantity,
                                    price
                                )
                            }
                        >
                            Add to cart
                        </button>
                    </div>
                </>
            ) : (
                <p className="unavailable-text">Not available</p>
            )}
        </div>
    )
}

PizzaCard.propTypes = {
    pizza: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ingredients: PropTypes.string.isRequired,
        imageName: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        S_size: PropTypes.number.isRequired,
        M_size: PropTypes.number.isRequired,
        L_size: PropTypes.number.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
}

export default WelcomePage
