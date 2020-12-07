module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/react',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  rules: {
    'prettier/prettier': 1,
    // 'no-console': ['warn', { allow: ['warn', 'error'] }],
    // '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    'react-hooks/rules-of-hooks': 'error', // hooks 规则
    'react-hooks/exhaustive-deps': 'warn', // hooks 规则
    'react/display-name': [0],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    eqeqeq: 2, //必须使用 === 和 !==
    // 'no-empty-function': 2, // 禁止空函数
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-trailing-spaces': 2, //禁止禁用行尾空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-in-parens': 2, // 强制在圆括号内使用一致的空格
    'no-var': 2, // 要求使用 let 或 const 而不是 var,
    'no-unused-vars': 2, // 禁止出现未使用过的变量
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
  },
}
