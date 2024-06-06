import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'nordzero': 'rgb(var(--nordzero))',
        'nordone': 'rgb(var(--nordone))',
        'nordtwo': 'rgb(var(--nordtwo))',
        'nordwhite': 'rgb(var(--nordfour))',
        'nordblue': 'rgb(var(--nordeight))',
        'nordoceanblue': 'rgb(var(--nordnine))',
        'nordgreen': 'rgb(var(--nordseven))',
        'nordred': 'rgb(var(--nordeleven))',
        'nordorange': 'rgb(var(--nordtwelve))',
        'nordyellow': 'rgb(var(--nordthirteen))',
      },
    },
  },
  plugins: [],
};
export default config;
