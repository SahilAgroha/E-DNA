import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { colors } from '@mui/material'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
  ],
  server:{
    port:3000,
  },
  theme:{
    extends:{
      colors:{
        "primary-color":"#00927c",
        "secondary-color":"#EAF0F1"
      }
    }
  },
  
})



