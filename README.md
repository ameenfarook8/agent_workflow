# 🎉 Name Greeter — React + Vite + Tailwind

A sleek, single-page React application built with Vite and Tailwind CSS. The app presents a centered input form where users can enter their name; upon submission it displays a personalised thank-you message and launches a burst of confetti to celebrate!

---

## ✨ Features

- **Single-page app** — no routing, no clutter, just a clean centered UI
- **Name input form** — modern, accessible text field with a submit button
- **Confetti celebration** — triggered via `canvas-confetti` when the user submits their name
- **Thank-you message** — dynamically shows _"Thanks for entering, \<Name\>!"_ after submission
- **Tailwind CSS** — utility-first styling for a polished, responsive design
- **Vite** — lightning-fast dev server and optimised production builds
- **GitHub Actions CI/CD** — automatic deployment to GitHub Pages on every push to `main`

---

## 🖼️ UI Overview

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│          ✨  Name Greeter  ✨            │
│                                          │
│    ┌──────────────────────────────┐      │
│    │  Enter your name…            │      │
│    └──────────────────────────────┘      │
│                                          │
│         [ 🎉  Submit ]                   │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

After submission:

```
┌──────────────────────────────────────────┐
│  🎊  🎊  🎊  🎊  🎊  🎊  🎊  🎊        │
│                                          │
│    Thanks for entering, Alice! 🎉        │
│                                          │
│         [ Enter another name ]           │
│  🎊  🎊  🎊  🎊  🎊  🎊  🎊  🎊        │
└──────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS framework |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Confetti animation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20 (matches the CI/CD environment)
- npm ≥ 9 (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/agent_workflow.git
cd agent_workflow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

The optimised output is placed in the `dist/` directory.

### Preview the production build locally

```bash
npm run preview
```

---

## 📁 Project Structure

```
agent_workflow/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Root component — name form + thank-you state
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind base / component / utility imports
├── index.html           # Vite HTML template
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration (Tailwind + Autoprefixer)
├── vite.config.js       # Vite configuration (base path for GitHub Pages)
└── package.json
```

---

## 🧩 Key Implementation Details

### `src/App.jsx`

```jsx
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">✨ Name Greeter</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your name…"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 text-lg transition-colors"
              >
                🎉 Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-purple-700 mb-6">
              Thanks for entering, {name}! 🎊
            </p>
            <button
              onClick={handleReset}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-3 px-6 text-lg transition-colors"
            >
              Enter another name
            </button>
          </>
        )}
      </div>
    </main>
  );
}
```

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/agent_workflow/',   // must match the GitHub repository name
});
```

---

## ⚙️ GitHub Actions — Deploy to GitHub Pages

The repository ships with a workflow file at `.github/workflows/deploy.yml` that:

1. Triggers on every push to the `main` branch
2. Checks out the code
3. Sets up Node.js 20
4. Installs dependencies with `npm ci`
5. Runs `npm run build` to produce the `dist/` folder
6. Deploys the `dist/` folder to the `gh-pages` branch using the official GitHub Pages action

### Workflow file (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Enable GitHub Pages in your repository

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push a commit to `main` — the workflow runs automatically and publishes the site

Your app will be live at:
```
https://YOUR_USERNAME.github.io/agent_workflow/
```

---

## 📝 License

MIT
