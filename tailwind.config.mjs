/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:       '#6c47ff',
        'primary-dark':'#4f2fe0',
        accent:        '#00d4aa',
        dark:          '#0d0d1a',
        dark2:         '#13132a',
        dark3:         '#1c1c3a',
        card:          '#18183a',
        muted:         '#9090b0',
        legendary:     '#953EA1',
      },
    },
  },
  plugins: [],
};
