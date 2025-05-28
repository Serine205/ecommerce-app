import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Checkout.css';

export default function Checkout() {
    const { cart, clearCart } = useContext(CartContext);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const deliveryFee = 500;
    const totalWithoutDelivery = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalWithDelivery = totalWithoutDelivery + deliveryFee;

    // ? Rediriger si panier vide
    useEffect(() => {
        if (cart.length === 0) {
            alert(" Votre panier est vide !");
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!phone.trim() || !address.trim()) {
            alert(' Veuillez remplir tous les champs.');
            return;
        }

        const templateParams = {
            phone,
            address,
            order: cart.map(item =>
                `${item.name} x${item.qty} - ${(item.price * item.qty).toLocaleString()} DZD`
            ).join('\n') + `\nLivraison - ${deliveryFee.toLocaleString()} DZD`,
            total: totalWithDelivery.toLocaleString()
        };

        emailjs.send(
            'service_i4ge967',
            'template_7bmaa9e',
            templateParams,
            'irxj45gaV5EC_WRZd'
        ).then(() => {
            clearCart();
            alert(" Commande envoyee par e-mail !");
            navigate('/cart');
        }).catch((error) => {
            console.error(" Erreur EmailJS :", error);
            alert("Erreur lors de l’envoi de l’e-mail.");
        });
    };

    return (
        <div className="checkout-container">
            <h2>Finaliser votre commande</h2>

            <form onSubmit={handleSubmit} className="checkout-form">
                <label>
                    Numero de telephone :
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Adresse de livraison :
                    <textarea
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </label>

                <div className="checkout-summary">
                    <h3>Votre commande</h3>
                    {cart.map(item => (
                        <p key={item.id}>
                            {item.name} {item.qty}  <strong>--> {(item.price * item.qty).toLocaleString()} DZD</strong>
                        </p>
                    ))}
                    <p>Livraison  <strong>--> {deliveryFee.toLocaleString()} DZD</strong></p>
                    <h4>Total : <strong>{totalWithDelivery.toLocaleString()} DZD</strong></h4>
                </div>

                <button type="submit" className="validate-btn">
                    Valider ma commande
                </button>
            </form>
        </div>
    );
}
