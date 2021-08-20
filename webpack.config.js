const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output:{
        filename: '[name].js',
        path:path.resolve('./dist')
    },
    module: {
        rules: [
          {
            test: /\.css$/, // .css 확장자로 끝나는 모든 파일
            use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다 
            //배열 뒤에서부터 실행된다!, // css-loader를 적용한다
          },
          {
            test: /\.png$/, // .png 확장자로 마치는 모든 파일
            loader: "file-loader",
            options: {
              publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
              name: "[name].[ext]?[hash]", // 파일명 형식
            },
          }
        ],
    },
    
}


