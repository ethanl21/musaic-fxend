/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		extends: ["prettier", "next/core-web-vitals", "next/typescript"],
		parser: "@typescript-eslint/parser",
		plugins: ["@typescript-eslint/eslint-plugin"],
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			project: "./tsconfig.json",
		},
		rules: {
			"react/no-unescaped-entities": "off",
		},
	}
};

module.exports = nextConfig;
