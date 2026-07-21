import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  // TODO: GitHub Pages のプロジェクトサイトに公開する場合は '/<リポジトリ名>/' に変更する（STEP8でリポジトリ作成後に確定）
  base: './',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});
