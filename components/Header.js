import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products } from '../data/products';
import * as cart from '../lib/cart';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'collections' or 'shop' or null
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((open) => !open);
  const toggleSearch = () => setSearchOpen((s) => !s);

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  // close dropdown and search when clicking outside
  useEffect(() => {
    const onDocumentClick = (e) => {
      setOpenDropdown(null);
      // if click happens outside search box and toggle, close search
      const searchBox = document.querySelector('.header-search');
      const toggle = document.querySelector('.search-toggle-btn');
      if (searchBox && toggle && !searchBox.contains(e.target) && !toggle.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  // listen for cart updates
  useEffect(() => {
    const refresh = () => {
      setCartCount(cart.getCount());
      setCartItems(cart.getCart().items || []);
    };
    refresh();
    window.addEventListener('cart:update', refresh);
    return () => window.removeEventListener('cart:update', refresh);
  }, []);

  // add scrolled class when page scrolls past nav height
  useEffect(() => {
    const onScroll = () => {
      const headerEl = document.querySelector('.site-header');
      if (!headerEl) return;
      if (window.scrollY > 20) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // stop propagation on nav itself so clicks inside don't close immediately
  const handleNavClick = (e) => e.stopPropagation();

  return (
    <header className="site-header">
      <div className="container header-inner" onClick={handleNavClick}>
        <div className="header-left">
          <Link href="/" className="brand">
            <img
              className="brand-logo-img"
              src="/assets/leezo-logo.png"
              alt="Leezo logo"
            />
            {/* <span className="brand-text">Leezo</span> */}
          </Link>
        </div>

        <div className="header-center">
          <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main">
            <ul className="nav-list">
              <li className="nav-item"><Link href="/#new-arrivals">New</Link></li>
              <li
                className={`nav-item nav-dropdown${openDropdown === 'collections' ? ' open' : ''
                  }`}
              >
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  aria-expanded={openDropdown === 'collections'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('collections');
                  }}
                >
                  Collections
                </button>
                <div className="dropdown-panel">
                  <div className="dropdown-column">
                    <p className="dropdown-title">Highlights</p>
                    <ul>
                      <li><Link href="/category/new-arrivals">New Arrivals</Link></li>
                      <li><Link href="/category/best-sellers">Best Sellers</Link></li>
                      <li><Link href="/category/sale">Sale</Link></li>
                    </ul>
                  </div>
                </div>
              </li>

              <li
                className={`nav-item nav-dropdown${openDropdown === 'shop' ? ' open' : ''
                  }`}
              >
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  aria-expanded={openDropdown === 'shop'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('shop');
                  }}
                >
                  Shop
                </button>
                <div className="dropdown-panel">
                  <div className="dropdown-column">
                    <p className="dropdown-title">Men</p>
                    <ul>
                      <li><Link href="/category/men-tshirts">T-Shirts</Link></li>
                      <li><Link href="/category/men-hoodies">Hoodies</Link></li>
                      <li><Link href="/category/men-jackets">Jackets</Link></li>
                      <li><Link href="/category/men-pants">Pants</Link></li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="nav-item"><Link href="/about">About</Link></li>
              <li className="nav-item"><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className={`header-search${searchOpen ? ' mobile-open' : ''}`}>
            <div className="search-input-wrapper">
              <svg className="input-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products, categories..."
                aria-label="Search products"
                value={query}
                onChange={(e) => {
                  const v = e.target.value;
                  setQuery(v);
                  if (!v) return setSuggestions([]);
                  const q = v.toLowerCase();
                  const list = products
                    .filter((p) => p.name.toLowerCase().includes(q) || (p.meta && p.meta.toLowerCase().includes(q)))
                    .slice(0, 6);
                  setSuggestions(list);
                }}
              />
            </div>

            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((s) => (
                  <li key={s.id} onClick={() => router.push(`/product/${s.id}`)}>
                    <img src={s.image} alt="" />
                    <div className="suggestion-body">
                      <div className="suggestion-title">{s.name}</div>
                      <div className="suggestion-meta">{s.meta}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="header-right">
          <button
            className="icon-btn search-toggle-btn"
            aria-label="Toggle search"
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch();
            }}
            title="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div className="cart-wrap">
            <button
              className="icon-btn cart-button"
              aria-label="View cart"
              onClick={(e) => {
                e.stopPropagation();
                setCartOpen((s) => !s);
              }}
              title="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            <div className={`mini-cart${cartOpen ? ' open' : ''}`}>
              <div className="mini-cart-head">
                <strong>Your cart</strong>
                <button onClick={() => { cart.clearCart(); setCartOpen(false); }} aria-label="Clear cart">Clear</button>
              </div>
              <div className="mini-cart-body">
                {cartItems.length === 0 && <p className="muted">Your cart is empty.</p>}
                {cartItems.map((it) => {
                  const prod = products.find((p) => p.id === it.id);
                  const thumb = it.image || (prod && prod.image) || '';
                  return (
                    <div className="mini-cart-item" key={it.id}>
                      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        {thumb ? <img src={thumb} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} /> : <div style={{ width: 56, height: 56, background: '#222', borderRadius: 8 }} />}
                        <div style={{ flex: 1 }}>
                          <div className="mini-cart-item-name">{it.name}</div>
                          <div className="mini-cart-item-meta">{it.qty} × ₹{it.price}</div>
                        </div>
                        <div>
                          <button className="mini-cart-remove" onClick={() => cart.removeItem(it.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mini-cart-footer">
                <button className="btn ghost" onClick={() => { setCartOpen(false); router.push('/cart'); }}>View cart</button>
                <button className="btn primary" onClick={() => router.push('/checkout')}>Checkout</button>
              </div>
            </div>
          </div>

          <button className="icon-btn account-button" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="hamburger">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
