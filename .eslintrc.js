module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },

    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        camelcase: 'off',
        indent: ['error', 4],
        'no-console': 'off',
        'class-method-user-this': 'off',
        'class-methods-use-this': 'off',
        'import/no-import-module-exports': 'off',
        'import/first': 'off',
        'max-len': ['error', { code: 120 }],
        'object-curly-newline': [
            'error',
            {
                ExportDeclaration: { multiline: true, minProperties: 5 },
            },
        ],

        // avoid errors importing local packages4
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    // avoid errors with default packages as 'express'
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts', '.d.ts', '.tsx'],
            },
        },
    },
};
