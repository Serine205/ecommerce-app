import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    // Charger le panier depuis localStorage au démarrage
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Sauvegarder le panier à chaque changement
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Ajouter un produit
    const addToCart = (product) => {
        const exist = cart.find(item => item.id === product.id);
        if (exist) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    // Supprimer un produit
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Modifier la quantité
    const updateQuantity = (id, qty) => {
        if (qty < 1) {
            removeFromCart(id);
        } else {
            setCart(cart.map(item =>
                item.id === id ? { ...item, qty } : item
            ));
        }
    };

    // Vider le panier
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
