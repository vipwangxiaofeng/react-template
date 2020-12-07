
module.exports = {
  printWidth: 180, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  semi: false, // 声明结尾使用分号(默认true)
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: true, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: true,
  insertPragma: false, // 插入@format标识
  // trailingComma: 'none',
  // ignorePath: '.prettierignore',
  endOfLine: 'auto',
  trailingComma: 'all', // 多行使用拖尾逗号（默认none）
  parser: 'typescript'
}
