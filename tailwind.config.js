/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index/*.html',
    './src/main/*.ts',
    './src/app/pages/**/*.{html,ts}',
    './src/app/shared/components/**/*.{html,ts}',
    './src/app/shared/directives/**/*.{html,ts}',
    './src/app/shared/pipes/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('src/assets/images/login.png')",
        'store': "url('src/assets/others/store.jpg')",
        'admin': "url('src/assets/others/admin.jpg')",
      },
    },
  },
  plugins: [],
}
