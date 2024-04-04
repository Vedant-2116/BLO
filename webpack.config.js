// webpack.config.js or webpack.config.prod.js

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // Other webpack configurations
  plugins: [
    new CopyPlugin({
      patterns: [
        // Copy image files
        { from: 'public/img', to: 'src/assets/img' },
        // Copy video files
        { from: 'public/video', to: 'src/assets/video' },
        // Add more patterns as needed for other file types
      ],
    }),
  ],
};
