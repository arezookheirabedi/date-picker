module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  devServer: {
    proxy: {
      '/fast': {
        target: "https://omidgw.vaslapp.com",
        // target: 'https://gateway.new.vaslapp.com',
        // target: 'https://gateway.new.vaslapp.com',
        changeOrigin: true,
        pathRewrite: {'^/fast': ''},
        secure : false
      },
      '/guilds': {
        target: "https://omidgw.vaslapp.com",
        // target: 'https://gateway.new.vaslapp.com',
        // target: 'https://gateway.new.vaslapp.com',
        changeOrigin: true,
        pathRewrite: {'^/guilds': ''},
        secure : false
      },
      '/transport': {
        target: "https://omidgw.vaslapp.com",
        // target: 'https://gateway.new.vaslapp.com',
        // target: 'https://gateway.new.vaslapp.com',
        changeOrigin: true,
        pathRewrite: {'^/transport': ''},
        secure : false
      },
    },
  },
};

