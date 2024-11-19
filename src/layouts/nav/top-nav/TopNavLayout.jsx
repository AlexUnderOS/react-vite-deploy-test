import './TopNav.scss'
import useParallax from '../../../hooks/useParalax'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TopNavLayout() {
    const [isSticky, setIsSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useParallax('.pizza-constructor')

    return (
        <header>
            <nav className="top-nav">
                <div className="content-1">
                    <div className="l-side">
                        <img
                            draggable="false"
                            className="logo"
                            src="/src/images/pizzalogo.png"
                            alt="pizza osta"
                        />
                        <h1>Pizza Osta</h1>
                        <p className="linear-gradient-rl">+371 999 999 99</p>
                    </div>
                    <div className="r-side">
                        <div className="pizza-constructor">
                            <a href="/pizza-constructor">Constructor</a>
                        </div>
                        <Link to={'/login'} className="login">
                            Log In / Sign Up
                        </Link>
                    </div>
                </div>
                <div className="container-2">
                    <div className={`content-2 ${isSticky ? 'sticky' : ''}`}>
                        <ul>
                            <li>
                                <Link to={'offers'}>Offers</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Order</Link>
                            </li>
                            <li>
                                <Link to={'find-us'}>Find Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default TopNavLayout
