const path = require("path");

function resolve(filename) {
  return path.join(__dirname, filename);
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
      config.module
        .rule("scss")
        .oneOf(match)
        .use("sass-loader")
        .tap(opt =>
          Object.assign(opt, {
            prependData: `@import '~@/assets/global.scss';`
          })
        );
    });
  },
  devServer: {
    port: 8085,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
