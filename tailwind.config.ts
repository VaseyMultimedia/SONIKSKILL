import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { vm: { void: '#00090E', charcoal: '#101214', deep: '#001B25', teal: '#013D4F', cyan: '#00FFFF', blue: '#009CFF', muted: '#8FB8C6', graphite: '#1C2228' } } } }, plugins: [] };
export default config;
