// Empty on purpose: Strapi's admin build (Vite) searches upward through
// parent directories for a PostCSS config. Without this file, it finds the
// frontend's postcss.config.js one level up — which requires tailwindcss,
// a dependency that only exists in the frontend's node_modules, not here.
// This stops that upward search from ever reaching the parent.
module.exports = {
  plugins: {},
};
