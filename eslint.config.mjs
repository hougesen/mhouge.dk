// @ts-check

import tailwind from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(tailwind.configs['flat/recommended'])
  .override('nuxt/vue/rules', {
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
    },
  })
  .override('tailwindcss:rules', {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  });
