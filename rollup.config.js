import { defineConfig } from 'rollup';
import { createOption } from './rollup.config.base.js';

export default defineConfig([createOption('cjs'), createOption('esm')]);
