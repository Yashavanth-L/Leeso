import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import * as cart from '../lib/cart';

export default function Product() {
  const product = {
    id: 'tee-essential-001',
    name: 'Essential Cotton Tee',
    price: 699,
    image: '/assets/leezo-tee.jpg',
    description:
      'A minimal, breathable cotton tee designed for everyday comfort. Slightly relaxed fit with reinforced seams.',
    variants: ['S', 'M', 'L', 'XL'],
  };

  const [size, setSize] = useState(product.variants[1]);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let t;
    if (toast) t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));

  const handleAddToCart = async () => {
    setAdding(true);

    // add item to cart immediately so header count updates quickly
    cart.addItem({ ...product, selectedSize: size }, qty);

    // dynamic import of animejs for client-side animation
    try {
      const anime = (await import('animejs/lib/anime.es.js')).default;

      // pulse the cart button in header
      anime({
        targets: '.cart-button',
        scale: [1, 1.18, 1],
        duration: 650,
        easing: 'easeOutElastic(1, .6)'
      });

      // show toast animation
      setToast(`${product.name} — added (${qty} × ${size})`);
      // small enter animation for toast
      anime({
        targets: '.toast',
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 360,
        easing: 'easeOutCubic'
      });

      // auto-hide animation (fade out) after timeout
      setTimeout(() => {
        anime({
          targets: '.toast',
          opacity: [1, 0],
          translateY: [0, -6],
          duration: 420,
          easing: 'easeInCubic'
        });
        setToast(null);
      }, 1800);
    } catch (err) {
      // fallback: just show toast without animation
      setToast(`${product.name} — added (${qty} × ${size})`);
      setTimeout(() => setToast(null), 2000);
    }

    // finish button state after small delay
    setTimeout(() => setAdding(false), 420);
  };

  return (
    <>
      <Head>
        <title>Leezo - {product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="product-page">
        <div className="container product-grid">
          <div className="product-media">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="muted">₹{product.price}</p>
            <p className="product-desc">{product.description}</p>

            <div className="product-actions">
              <div className="field">
                <label>Size</label>
                <div className="size-options">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      className={`size-btn${size === v ? ' active' : ''}`}
                      onClick={() => setSize(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Quantity</label>
                <div className="qty-stepper">
                  <button onClick={() => changeQty(-1)} aria-label="Decrease">−</button>
                  <input value={qty} readOnly />
                  <button onClick={() => changeQty(1)} aria-label="Increase">+</button>
                </div>
              </div>

              <div className="field">
                <button className={`btn primary add-btn${adding ? ' adding' : ''}`} onClick={handleAddToCart}>
                  {adding ? 'Adding…' : `Add to cart — ₹${product.price * qty}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </main>
    </>
  );
}
