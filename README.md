# Leezo Clothing Website (React/Next.js Edition)

The project has been migrated from a static HTML/CSS site into a **Next.js** application.

### New structure

- `pages/` – Next.js pages (`index.js` is the landing page)
- `styles/globals.css` – global stylesheet (migrated from `styles.css`)
- `public/assets/` – static images and other assets (move your existing `assets` folder here)
- `next.config.js` – Next.js configuration
- `package.json` – dependencies and scripts for development

> ⚠️ The original `index.html` has been removed. You can keep backups if needed.

### Getting Started

1. **Install Node.js** (version 18+ recommended) if you haven't already.
2. From the project root run:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Building & Production

- `npm run build` – build for production
- `npm start` – start built application

### Assets

Move the contents of the old `assets/` directory into `public/assets/` so Next.js can serve them at `/assets/…`.

### Next steps

- Break the large `index.js` into smaller React components under `components/`.
- Add dynamic data, API routes, or integrate with a backend.
- Explore Next.js features like image optimization, internationalization, and server-side rendering.

Enjoy the upgrade! 🎉

