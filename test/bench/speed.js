var Benchmark = require('benchmark'),
  suite = new Benchmark.Suite(),
  expect = require('expect.js'),
  observable = require('../..'),
  el = observable(),
  iterationsCounter = 0,
  eventsCounter = 0

suite
  .add('simple event', function() {
    iterationsCounter++
    el.trigger('foo')
  }, {
    onStart() {
      iterationsCounter = 0
      eventsCounter = 0
      var fn = () => eventsCounter++
      el.on('foo', fn)
    },
    onComplete() {
      expect(eventsCounter).to.be(iterationsCounter)
      el.off('*')
    }
  })
  .add('namespaced event', function() {
    iterationsCounter++
    el.trigger('foo')
  }, {
    onStart() {
      iterationsCounter = 0
      eventsCounter = 0
      var fn = () => eventsCounter++
      el.on('foo.bar', fn)
    },
    onComplete() {
      expect(eventsCounter).to.be(iterationsCounter)
      el.off('*')
    }
  })
  .add('multiple events', function() {
    iterationsCounter++
    el.trigger('foo')
  }, {
    onStart() {
      iterationsCounter = 0
      eventsCounter = 0
      var fn = () => eventsCounter++
      el.on('foo bar', fn)
    },
    onComplete() {
      expect(eventsCounter).to.be(iterationsCounter)
      el.off('*')
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()
