// src/pages/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import './SearchResults.css';

export default function SearchResults() {
    const query = new URLSearchParams(useLocation().search).get('query') || '';

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="search-results">
            <h2>Resultats pour : "{query}"</h2>

            {filtered.length > 0 ? (
                <div className="results-grid">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="no-results">Aucun produit trouve.</p>
            )}
        </div>
    );
}
