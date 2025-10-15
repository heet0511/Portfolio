import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages at https://<user>.github.io/<repo>,
// set base to '/<repo>/' below. For Vercel/Netlify, leave as default ('/').
export default defineConfig({
  plugins: [react()],
  // base: '/YOUR_REPO_NAME/',
})
