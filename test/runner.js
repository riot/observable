var isNode = typeof window === 'undefined'

describe('Observable Tests', function() {
  if (isNode) {
    global.expect = require('expect.js')
  } else {
    mocha.run()
  }
})
