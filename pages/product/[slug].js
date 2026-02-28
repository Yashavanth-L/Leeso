import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import { products } from '../../data/products';
import * as cart from '../../lib/cart';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const product = products.find((p) => p.id === slug);

  return (
    <>
      <Head>
        <title>{`Leezo – ${product ? product.name : ''}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />

      <main className="container section product-page">
        {!product && <p>Loading…</p>}
        {product && (
          <div className="product-grid">
            {/* Left side: Product Image */}
            <div className="product-media">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>

            {/* Right side: Product Information */}
            <div className="product-details">
              <p className="eyebrow muted">{product.meta}</p>
              <h1>{product.name}</h1>
              <p className="product-price" style={{ fontSize: '1.2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                ₹{product.price}
              </p>

              <p className="product-desc">
                Elevate your everyday wardrobe with the premium {product.name.toLowerCase()}. Crafted with meticulous attention to detail and designed for ultimate comfort and durability.
              </p>

              <div className="product-actions" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
                <div className="field size-selection" style={{ width: '100%', maxWidth: '300px' }}>
                  <label htmlFor="size-select">Size</label>
                  <select
                    id="size-select"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      background: 'black',
                      color: 'white',
                      border: '1px solid #333'
                    }}
                  >
                    {product.sizes.map((sz) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                </div>

                <div className="action-row" style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '300px', marginTop: '1rem' }}>
                  <button
                    className="btn primary"
                    style={{ flex: 1, padding: '1rem' }}
                    onClick={() => {
                      cart.addItem(product, 1);
                      try {
                        window.dispatchEvent(new CustomEvent('cart:update'));
                      } catch (e) { }
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { products } = require('../../data/products');
  const paths = products.map(p => ({
    params: { slug: p.id }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: {} };
}
