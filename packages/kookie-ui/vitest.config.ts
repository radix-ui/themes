import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['dist', 'node_modules'],
    css: true,
    restoreMocks: true,
    clearMocks: true,
    // Reduce chances of open handles keeping workers alive
    pool: 'forks',
    fileParallelism: false,
    minWorkers: 1,
    maxWorkers: 1,
    testTimeout: 2000,
    hookTimeout: 2000,
  },
});
