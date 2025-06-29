// tailwind.config.ts - Updated for v4 with custom animations

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom animations for futuristic effects
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      // Custom keyframes for animations
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 5px rgba(59, 130, 246, 0.5)'
          },
          '50%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)'
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            'box-shadow': '0 0 5px currentColor'
          },
          '50%': {
            opacity: '0.8',
            'box-shadow': '0 0 15px currentColor, 0 0 25px currentColor'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-468px 0'
          },
          '100%': {
            'background-position': '468px 0'
          },
        },
        'slide-in-from-bottom': {
          from: {
            opacity: '0',
            transform: 'translateY(24px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          to: {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'fade-in': {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          },
        },
      },
      // Custom background sizes for gradient animations
      backgroundSize: {
        'size-300': '300% 300%',
        'size-200': '200% 200%',
      },
      // Custom colors for neon effects
      colors: {
        // Extend existing colors with neon variants
        neon: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#22c55e',
          purple: '#8b5cf6',
          pink: '#ec4899',
        }
      },
      // Custom box shadows for glow effects
      boxShadow: {
        'neon-blue': '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)',
        'neon-cyan': '0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3), 0 0 15px rgba(6, 182, 212, 0.2)',
        'neon-green': '0 0 5px rgba(34, 197, 94, 0.5), 0 0 10px rgba(34, 197, 94, 0.3), 0 0 15px rgba(34, 197, 94, 0.2)',
        'neon-purple': '0 0 5px rgba(147, 51, 234, 0.5), 0 0 10px rgba(147, 51, 234, 0.3), 0 0 15px rgba(147, 51, 234, 0.2)',
        'glow-blue': '0 0 10px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)',
        'glow-green': '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.2)',
        'glow-cyan': '0 0 10px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.4), 0 0 30px rgba(6, 182, 212, 0.2)',
      }
    },
  },
  plugins: [],
};

export default config;