process.env.BABEL_ENV= 'test'

module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-babel-preprocessor'
    ],
    files: [
      '../node_modules/expect.js/index.js',
      '../dist/observable.js',
      'specs/core.specs.js'
    ],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    babelPreprocessor: {
      options: {
        configFile: true,
        sourceMap: 'inline'
      }
    },

    browsers: ['ChromeHeadlessNoSandbox'],

    reporters: ['progress', 'coverage'],
    preprocessors: {
      '../dist/observable.js': ['babel']
    },

    coverageReporter: {
      dir: '../coverage/',
      reporters: [{
        type: 'lcov',
        subdir: 'report-lcov'
      }]
    },

    singleRun: true
  })
}
