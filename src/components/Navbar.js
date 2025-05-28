// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Brown Shop</Link>
            </div>

            <form onSubmit={handleSearch} className="navbar-search">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"></button>
            </form>

            <div className="navbar-links">
                <Link to="/">Accueil</Link>
                <Link to="/cart" className="cart-link">
                    Panier <span className="cart-count">({itemCount})</span>
                </Link>
            </div>
        </nav>
    );
}
