import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import WelcomePage from './pages/Welcome/WelcomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import NotfoundPage from './pages/Errors/NotfoundPage'
import FindUsPage from './pages/FindUs/FindUsPage'
import OffersPage from './pages/Offers/OffersPage'
import TopNavLayout from './layouts/nav/top-nav/TopNavLayout'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <header>
                <TopNavLayout />
            </header>

            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/order" element={<WelcomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="offers" element={<OffersPage />} />
                <Route path="find-us" element={<FindUsPage />} />
                <Route path="*" element={<NotfoundPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
