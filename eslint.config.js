import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'dist-build/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    // ブラウザで動くフロントエンドのコード
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    // ビルド設定・開発用スクリプトなど Node で動くファイル
    files: ['vite.config.js', 'eslint.config.js', 'tools/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
