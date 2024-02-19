import daisyuiThemes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        cupcake: {
          primary: "#65c3c8",
          "primary-focus": "#42b2b8",
          "primary-content": "#ffffff",

          secondary: "#ef9fbc",
          "secondary-focus": "#e7739e",
          "secondary-content": "#ffffff",

          accent: "#eeaf3a",
          "accent-focus": "#e09915",
          "accent-content": "#ffffff",

          neutral: "#261230",
          "neutral-focus": "#200f29",
          "neutral-content": "#ffffff",

          "base-100": "#faf7f5",
          "base-200": "#efeae6",
          "base-300": "#e7e2df",
          "base-content": "#261230",

          info: "#1c92f2",
          success: "#00bdaa",
          warning: "#ff9900",
          error: "#ff6a3d",

          "--rounded-box": "0",
          "--rounded-btn": "00",
          "--rounded-badge": "0",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
  },
};
