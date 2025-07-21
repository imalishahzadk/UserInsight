/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',     // if you still have /pages
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // ...any other folders containing .js/.tsx that use Tailwind classes
  ],
  theme: { extend: {} },
  plugins: [],
}