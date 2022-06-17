module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 12,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-empty-interface': 'off',
		semi: 'off',
		'@typescript-eslint/semi': ['error'],
		'arrow-parens': 'off',
		'import/extensions': 'off',
		indent: 'off',
		'linebreak-style': [
			'error',
			process.platform === 'win32' ? 'windows' : 'unix',
		],
		'prefer-const': 'error',
		quotes: ['error', 'single'],
		'no-extra-semi': 'error',
	},
};
