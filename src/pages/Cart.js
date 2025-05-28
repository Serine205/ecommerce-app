// src/pages/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2> Votre Panier</h2>
                {cart.length > 0 && (
                    <Link to="/checkout" className="checkout-top-btn">
                         Commander
                    </Link>
                )}
            </div>

            {cart.length === 0 ? (
                <p className="empty-cart">Votre panier est vide.</p>
            ) : (
                <>
                    <div className="cart-list">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={`/images/${item.image}`} alt={item.name} />
                                <div className="cart-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.price.toLocaleString()} DZD</p>
                                    <div className="qty-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                            aria-label="Diminuer la quantité"
                                        >-</button>
                                        <span>{item.qty}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                                            aria-label="Augmenter la quantité"
                                        >+</button>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Supprimer ${item.name}`}
                                    >
                                         Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <h3>Total : <strong>{total.toLocaleString()} DZD</strong></h3>
                    </div>
                </>
            )}
        </div>
    );
}
