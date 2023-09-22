import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import resolve from 'rollup-plugin-node-resolve';
import { terser as rollupTerser } from 'rollup-plugin-terser';
import image from '@rollup/plugin-image';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const getPlugins = (format, devServe = false) => {
  const plugins = [
    resolve({ extensions: ['.vue', '.js'] }),
    commonjs(),
    vue({ css: false }),
    postcss({
      extract: 'index.css',
      plugins: [autoprefixer(), cssnano()],
    }),
    image(),
    rollupTerser({
      output: {
        comments: false,
      },
      module: false,
    }),
  ];
  if (devServe) {
    plugins.push(
      serve({
        open: true,
        contentBase: 'iife',
      })
    );
    plugins.push(livereload());
  }

  return plugins;
};

export function createOption(format, devServe = false) {
  const formatFolder = {
    esm: 'es',
    cjs: 'dist',
    iife: 'iife',
  };
  return {
    input: 'src/index.js',
    output: {
      file: `${formatFolder[format]}/reception.min.js`,
      format,
      name: 'reception',
    },
    plugins: getPlugins(format, devServe),
    external: [],
  };
}
