import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss({
      // Tailwind v4 will automatically read tailwind.config.js
    }),
    autoprefixer(),
  ],
}
