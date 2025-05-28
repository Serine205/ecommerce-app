import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const p = products.find(p => p.id === parseInt(id));
        if (p) {
            const updated = { ...p, views: p.views + 1 };
            setProduct(updated);

            const storedReviews = JSON.parse(localStorage.getItem(`reviews_${p.id}`)) || [];
            setReviews(storedReviews);
        }
    }, [id]);

    const handleAddComment = () => {
        if (comment.trim() === '') return;

        const newReview = {
            comment: comment.trim(),
            date: new Date().toLocaleString(),
        };
        const updated = [...reviews, newReview];
        setReviews(updated);
        setComment('');
        localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updated));
    };

    const handleDeleteReview = (indexToRemove) => {
        const updated = reviews.filter((_, index) => index !== indexToRemove);
        setReviews(updated);
        localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updated));
    };

    if (!product) return <p>Produit introuvable.</p>;

    const otherProducts = products.filter(p => p.id !== product.id).slice(0, 5);

    return (
        <>
            <div className="product-detail">
                <img src={`/images/${product.image}`} alt={product.name} />
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p><strong>Prix :</strong> {product.price.toLocaleString()} DZD</p>
                    <p><strong>Vues :</strong> {product.views}</p>
                    <p><strong>Vendus :</strong> {product.sold}</p>

                    <h3>Commentaires :</h3>
                    {reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <div key={index} className="review">
                                <p>{r.comment}</p>
                                <small>{r.date}</small>
                                <button className="delete-btn" onClick={() => handleDeleteReview(index)}>Supprimer</button>
                            </div>
                        ))
                    ) : (
                        <p>Aucun avis pour ce produit.</p>
                    )}

                    <div className="add-review">
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Ajoutez un commentaire..."
                        />
                        <button onClick={handleAddComment}>Envoyer</button>
                    </div>

                    <button onClick={() => addToCart(product)}>Ajouter au panier</button>
                </div>
            </div>

            <div className="related-products">
                <h3>Autres produits</h3>
                <div className="related-grid">
                    {otherProducts.map(p => (
                        <div
                            key={p.id}
                            className="related-card"
                            onClick={() => navigate(`/product/${p.id}`)}
                        >
                            <img src={`/images/${p.image}`} alt={p.name} />
                            <p>{p.name}</p>
                            <p><strong>{p.price.toLocaleString()} DZD</strong></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
