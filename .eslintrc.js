module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier', '@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      files: ['*.stories.@(ts|tsx|mdx)'],
      rules: {
        'react/function-component-definition': 'off'
      }
    }
  ],
  rules: {
    quotes: ['error', 'single'],
    'no-use-before-define': 'off',
    'import/no-cycle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@components',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@theme',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@types',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@utils',
            group: 'internal',
            position: 'before'
          }
        ],
        alphabetize: {
          order: 'desc',
          caseInsensitive: true
        },
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx']
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }]
  }
};
