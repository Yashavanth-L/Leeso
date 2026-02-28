export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="brand">
            <img
              className="brand-logo-img"
              src="./assets/leezo-logo.png"
              alt="Leezo logo"
            />
          </a>
          <p>© 2026 Leezo. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>

        <p className="footer-meta">Made with ❤️ for style seekers</p>
      </div>
    </footer>
  );
}