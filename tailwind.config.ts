import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        random:{
            '10%': { background: '#4a007f', 'box-shadow':'0 0 90px 70px rgb(223, 25, 25)' },
            '25%': { background: '#008490', 'box-shadow':'0 0 100px 90px rgb(89, 89, 221)'},
            '50%': { background: '#008490', 'box-shadow':'0 0 90px 70px green'},
            '75%': { background: '#929700', 'box-shadow':'0 0 100px 90px magenta'},
            '95%': { background: '#d57936', 'box-shadow':'0 0 90px 70px violet'},
        }
      },
      animation: {
        wiggle: 'random linear 15s infinite',
      }
    },
  },
  plugins: [],
}
export default config