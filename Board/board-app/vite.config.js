import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api' : { // '/api' 로 시작하는 요청들을 프록시 처리
        target: 'http://localhost:8080', // 실제 요청을 보낼 백엔드 주소
        changeOrigin: true, // 요청 헤더 Host를 target으로 변경.
        /* Ex
          Host : http://localhost:5173/api/boards
          => Host : http://localhost:8080/boards
        */

        rewrite: (path) => path.replace(/^\/api/,''), // /api 접두사 제거
        configure: (proxy) => { // Proxy 동작 설정
          proxy.on('proxyReq', (proxyReq) => {  // proxyReq 이벤트 : 백엔드 요청을 가로채는 이벤트
            proxyReq.removeHeader('origin') // origin 헤더 제거
          })
        }
      }
    }
  }
})
