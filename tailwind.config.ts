import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: "#1D4ED8",       // primary
                    light: "#3B82F6",
                    dark: "#111827",
                    body: "#4B5563",
                    bg: "#F9FAFB",
                    card: "#FFFFFF",
                    border: "#E5E7EB"
                }
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui"]
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem"
            },
            boxShadow: {
                card: "0 4px 12px rgba(0,0,0,0.05)"
            }
        }
    },
    plugins: []
}

export default config;
