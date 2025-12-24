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
    // Vitest 4.x: Run in single thread without forking to avoid EPERM errors on macOS
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true, // Run all tests in a single fork
      },
    },
    fileParallelism: false,
    testTimeout: 2000,
    hookTimeout: 2000,
  },
});
