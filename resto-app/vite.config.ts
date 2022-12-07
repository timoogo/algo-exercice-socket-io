import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        proxy: {
            '/socket.io': {
                target: 'ws://localhost:3000',
                ws: true,
            }
        }
    }
    
})