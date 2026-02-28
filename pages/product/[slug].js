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
        <title>Leezo – {product ? product.name : ''}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />

      <main className="container section product-page">
        {!product && <p>Loading…</p>}
        {product && (
          <div className="product-detail">
            <h1>{product.name}</h1>
            <p className="product-price">Price: ₹{product.price}</p>

            <div className="size-selection">
              <label>
                Size:
                <select>
                  {product.sizes.map((sz) => (
                    <option key={sz}>{sz}</option>
                  ))}
                </select>
              </label>
            </div>

            <button
              className="btn primary"
              onClick={() => {
                cart.addItem(product, 1);
                // ensure header updates
                try {
                  window.dispatchEvent(new CustomEvent('cart:update'));
                } catch (e) { }
              }}
            >
              Add to cart
            </button>
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
