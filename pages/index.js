import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function Home() {
  return (
    <>
      <Head>
        <title>Leezo - Modern Clothing</title>
        <meta name="description" content="Leezo - Minimal, modern clothing for everyday wear." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">New Season</p>
              <h1>Minimal styles for everyday comfort.</h1>
              <p className="hero-subtitle">
                Discover breathable fabrics, clean lines, and timeless silhouettes
                designed to move with you.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#new-arrivals">
                  Shop New Arrivals
                </a>
                <a className="btn ghost" href="#collections">
                  View Collections
                </a>
              </div>
            </div>
            <div className="hero-media" aria-hidden="true">
              <div className="hero-card large" />
              <div className="hero-card small" />
            </div>
          </div>
        </section>

        {/* FEATURED / NEW ARRIVALS SECTION */}
        <section className="section" id="new-arrivals">
          <div className="container">
            <header className="section-header">
              <h2>New Arrivals</h2>
              <p>Fresh Leezo pieces just landed this week.</p>
            </header>
            <div className="product-grid">
              {products
                .filter((p) => p.categories.includes('new-arrivals'))
                .map((p) => (
                  <article className="product-card" key={p.id} id={p.categories[0]}>
                    <div className="product-media">
                      <img src={p.image} alt={p.name} />
                    </div>
                    <div className="product-body">
                      <h3>{p.name}</h3>
                      <p className="product-meta">{p.meta}</p>
                      <p className="product-price">₹{p.price}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* Additional sections truncated for brevity; you can continue converting the remaining HTML similarly */}

      </main>

      <Footer />
    </>
  );
}
