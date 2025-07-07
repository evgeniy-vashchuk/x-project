import pluginJs from '@eslint/js';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

export default [
  pluginJs.configs.recommended,
  { ignores: ['dist', 'node_modules', '**/*.min.js', 'libs.js', 'src/libs/**.js'] },
  {
    plugins: { '@stylistic/js': stylisticJs },
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^\\$', args: 'none' }
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      '@stylistic/js/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/js/array-bracket-spacing': ['error', 'never'],
      '@stylistic/js/array-element-newline': ['error', 'consistent'],
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/block-spacing': ['error', 'always'],
      '@stylistic/js/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/js/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/js/function-call-spacing': ['error', 'never'],
      '@stylistic/js/function-paren-newline': ['error', 'multiline'],
      '@stylistic/js/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/js/indent': ['error', 2, { VariableDeclarator: { var: 2, let: 2, const: 3 } }],
      '@stylistic/js/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/lines-around-comment': [
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
      '@stylistic/js/lines-between-class-members': ['error', 'always'],
      '@stylistic/js/max-len': [
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
      '@stylistic/js/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/js/multiline-comment-style': ['error', 'separate-lines'],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/new-parens': ['error', 'always'],
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
      '@stylistic/js/no-confusing-arrow': ['error', { allowParens: false, onlyOneSimpleParam: false }],
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/no-floating-decimal': 'error',
      '@stylistic/js/no-mixed-operators': 'error',
      '@stylistic/js/no-multi-spaces': ['error', { exceptions: { VariableDeclarator: true } }],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/js/no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/js/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/js/one-var-declaration-per-line': ['error', 'initializations'],
      '@stylistic/js/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/js/padded-blocks': ['error', 'never'],
      '@stylistic/js/padding-line-between-statements': [
        'error',

        // Always require blank lines after directive (like 'use-strict'), except between directives
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },

        // Always require blank lines after import, except between imports
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },

        // Always require blank lines before and after every sequence of variable declarations and export
        { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export'] },
        { blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var', 'export'] },

        // Always require blank lines before and after class declaration, if, do/while, switch, try
        { blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
        { blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*' },

        // Always require blank lines before return statements
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      '@stylistic/js/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      '@stylistic/js/semi': ['error', 'always', { omitLastInOneLineClassBody: true }],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/semi-style': ['error', 'last'],
      '@stylistic/js/space-before-blocks': ['error', 'always'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/space-unary-ops': ['error', { words: true, nonwords: false }],
      '@stylistic/js/spaced-comment': ['error', 'always'],
      '@stylistic/js/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/js/template-curly-spacing': ['error', 'never'],
      '@stylistic/js/template-tag-spacing': ['error', 'never'],
      '@stylistic/js/wrap-regex': 'error',
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
