import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,mts}'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			import: importPlugin
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2016,
				project: './tsconfig.json',
				tsconfigRootDir: __dirname
			},
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		rules: {
			'import/order': [
				'error',
				{
					groups: [
						'builtin', // Node.js modules: fs, path
						'external', // npm packages: express, uuid
						'internal', // aliases: @app/, ecohub-shared
						'index', // ./ (index.ts)
						'sibling', // ./file.ts
						'parent' // ../file.ts, ../../file.ts и глубже
					],
					pathGroups: [
						{ pattern: './**', group: 'sibling' },
						{ pattern: '../*', group: 'parent' }
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'ignore'
					}
				}
			]
		}
	},
	{
		files: ['eslint.config.mts'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off'
		}
	}
);
