import { defineConfig } from 'rollup';
import { createOption } from './rollup.config.base';

export default defineConfig([
  createOption('iife', true),
  createOption('cjs'),
  createOption('esm'),
]);
