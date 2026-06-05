import pluginJs from '@eslint/js';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import-x';
import globals from 'globals';

import { srcPath, distPath } from './gulp/config.js';

export default [
  pluginJs.configs.recommended,
  { ignores: [distPath, 'node_modules', '**/*.min.js', 'libs.js', `${srcPath}/libs/**/*.js`] },
  {
    plugins: {
      '@stylistic': stylistic,
      'import-x': importPlugin
    },
    files: ['**/*.js'],
    settings: {
      'import-x/resolver': {
        node: {
          paths: [srcPath],
          extensions: ['.js']
        }
      }
    },
    rules: {
      'no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^\\$', args: 'none' }
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': ['error', 'multiline'],
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/indent': ['error', 2, {
        VariableDeclarator: {
          var: 2, let: 2, const: 3
        }
      }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/key-spacing': ['error', {
        beforeColon: false, afterColon: true, mode: 'strict'
      }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true
        }
      ],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/max-len': [
        'error',
        {
          code: 150,
          tabWidth: 2,
          comments: 150,
          ignorePattern: 'stylers:',
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true
        }
      ],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
      '@stylistic/no-confusing-arrow': ['error', { allowParens: false, onlyOneSimpleParam: false }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-multi-spaces': ['error', { exceptions: { VariableDeclarator: true } }],
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1, maxEOF: 1, maxBOF: 0
      }],
      '@stylistic/no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true, minProperties: 3, consistent: true
          },
          ObjectPattern: {
            multiline: true, minProperties: 3, consistent: true
          },
          ImportDeclaration: {
            multiline: true, minProperties: 3, consistent: true
          },
          ExportDeclaration: {
            multiline: true, minProperties: 3, consistent: true
          }
        }
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/one-var-declaration-per-line': ['error', 'initializations'],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/padding-line-between-statements': [
        'error',

        // Always require blank lines after directive (like 'use-strict'), except between directives
        {
          blankLine: 'always', prev: 'directive', next: '*'
        },
        {
          blankLine: 'any', prev: 'directive', next: 'directive'
        },

        // Always require blank lines after import, except between imports
        {
          blankLine: 'always', prev: 'import', next: '*'
        },
        {
          blankLine: 'any', prev: 'import', next: 'import'
        },

        // Always require blank lines before and after every sequence of variable declarations and export
        {
          blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export']
        },
        {
          blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*'
        },
        {
          blankLine: 'any', prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var', 'export']
        },

        // Always require blank lines before and after class declaration, if, do/while, switch, try
        {
          blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try']
        },
        {
          blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*'
        },

        // Always require blank lines before return statements
        {
          blankLine: 'always', prev: '*', next: 'return'
        },
      ],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
      '@stylistic/semi': ['error', 'always', { omitLastInOneLineClassBody: true }],
      '@stylistic/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/wrap-regex': 'error',

      // Import sorting rules
      'import-x/order': [
        'error',
        {
          'groups': [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // internal modules (starting with @)
            'parent', // parent directory imports
            'sibling', // same directory imports
            'index' // index file imports
          ],
          'pathGroups': [
            {
              pattern: '@constants/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error'
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        jQuery: 'readonly',
        $: 'readonly',
      },
    },
  },
  {
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/no-inline-styles': 'off',
      '@html-eslint/no-target-blank': 'off',
      '@html-eslint/require-attrs': [
        'error',
        {
          tag: 'svg',
          attr: 'viewBox'
        },
        {
          tag: 'input',
          attr: 'type'
        },
      ],
      '@html-eslint/no-skip-heading-levels': 'off',
      '@html-eslint/require-frame-title': 'off',
      '@html-eslint/require-img-alt': 'error',
      '@html-eslint/attrs-newline': ['error', {
        closeStyle: 'newline',
        ifAttrsMoreThan: 5,
      }],
      '@html-eslint/id-naming-convention': ['error', 'camelCase'],
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }],
      '@html-eslint/quotes': ['error', 'double'],
      '@html-eslint/sort-attrs': ['error', {
        priority: [
          'rel',
          'sizes',
          'class',
          'id',
          'name',
          'type',
          'href',
          'src',
          'alt',
          'title',
          'style'
        ]
      }],
      '@html-eslint/use-baseline': 'off',
    },
    plugins: { '@html-eslint': html },
    languageOptions: { parser: htmlParser },
  },
];
