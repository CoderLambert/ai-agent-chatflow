import pxtorem from 'postcss-pxtorem';
const config = {
  plugins: ["@tailwindcss/postcss",
    pxtorem({
      rootValue: 75, // 根值，设计稿 px / 75 = rem
      unitPrecision: 5, // rem 小数位精度
      propList: ['*'], // 转换所有属性（如 width, height, padding, font-size 等）
      selectorBlackList: [], // 可忽略某些选择器（如 ['html'] 以防转换根元素）
      replace: true, // 替换原值
      mediaQuery: false, // 不转换媒体查询中的 px（可选，根据需要）
      minPixelValue: 0, // 小于此值的 px 不转换（可设 2，避免 1px 边框变小）
      exclude: /node_modules/i // 排除 node_modules，避免转换第三方库
    })
  ],

};

export default config;
