import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { products } from '../../data/products';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  // simple mapping for title
  const title = slug ? slug.replace(/-/g, ' ') : '';

  // size filter state
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // compute filtered products whenever slug or selectedSizes change
  const filteredProducts = useMemo(() => {
    if (!slug) return [];
    return products.filter((p) => {
      // category match (slug may represent a tag)
      const matchesCategory = p.categories.includes(slug);
      if (!matchesCategory) return false;
      if (selectedSizes.length === 0) return true;
      return p.sizes.some((sz) => selectedSizes.includes(sz));
    });
  }, [slug, selectedSizes]);

  return (
    <>
      <Head>
        <title>{`Leezo – ${title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="container section">
        <h1 className="section-header">{title}</h1>

        {/* filter sidebar + product grid */}
        <div className="category-layout">
          <aside className="filter-panel">
            <h2>Filter by size</h2>
            <ul>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <li key={sz}>
                  <label>
                    <input
                      type="checkbox"
                      name="size"
                      value={sz}
                      checked={selectedSizes.includes(sz)}
                      onChange={() => toggleSize(sz)}
                    />{' '}
                    {sz}
                  </label>
                </li>
              ))}
            </ul>
          </aside>

          <section className="product-grid">
            {filteredProducts.length === 0 && (
              <p>No products found for this category.</p>
            )}

            {filteredProducts.map((p) => (
              <article className="product-card" key={p.id} id={p.categories[0]}>
                <div className="product-media">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="product-body">
                  <h3>
                    <Link href={`/product/${p.id}`}>{p.name}</Link>
                  </h3>
                  <p className="product-meta">{p.meta}</p>
                  <p className="product-price">₹{p.price}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { products } = require('../../data/products');
  const categories = new Set();
  products.forEach(p => p.categories.forEach(c => categories.add(c)));

  const paths = Array.from(categories).map(slug => ({
    params: { slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: {} };
}
