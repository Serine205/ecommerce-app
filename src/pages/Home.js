import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import products from '../data/products';
import ItemCard from '../components/ItemCard';
import '../styles/Home.css';

export default function Home() {
    const { addToCart } = useContext(CartContext);

    const scrollToProducts = () => {
        const section = document.getElementById('products');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            {/* Hero banner */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Welcome To Brown Shop</h1>
                    <p>Decouvrez notre collection moderne</p>
                    <button className="hero-button" onClick={scrollToProducts}>
                        Voir les produits
                    </button>
                </div>
            </section>

            {/* Section produits */}
            <section id="products" className="products-section">
                <h2>Nos produits</h2>
                <div className="home-grid">
                    {products.map(product => (
                        <ItemCard key={product.id} product={product} onAdd={addToCart} />
                    ))}
                </div>
            </section>
        </div>
    );
}
