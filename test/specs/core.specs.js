/*
 * Equivalent to Object.propertyIsEnumerable
 */
function hasEnumerableProperty(object, key) {
  for (var k in object) {
    if (key === k) {
      return true
    }
  }
  return false
}

describe('Core specs', function() {
  var el = observable(),
    counter = 0

  beforeEach(function() {
    counter = 0
  })

  afterEach(function() {
    el.off('*')
  })

  it('public methods should not be enumerable', function () {

    expect(hasEnumerableProperty(el, 'on')).to.be(false)
    expect(hasEnumerableProperty(el, 'one')).to.be(false)
    expect(hasEnumerableProperty(el, 'trigger')).to.be(false)
    expect(hasEnumerableProperty(el, 'off')).to.be(false)

  })

  it('public methods can not be configurable', function () {

    delete el.on
    expect(el.on).to.not.be(undefined)
    delete el.one
    expect(el.one).to.not.be(undefined)
    delete el.trigger
    expect(el.trigger).to.not.be(undefined)
    delete el.off
    expect(el.off).to.not.be(undefined)

  })

  it('public methods can not be overriden', function () {

    el.on = 'foo'
    expect(el.on).to.not.be('foo')
    el.one = 'foo'
    expect(el.one).to.not.be('foo')
    el.trigger = 'foo'
    expect(el.trigger).to.not.be('foo')
    el.off = 'foo'
    expect(el.off).to.not.be('foo')

  })


  it('single listener', function() {

    el.on('a', function(arg) {
      expect(arg).to.be(true)
    })
    el.trigger('a', true)

  })

  it('listeners with special chars', function() {

    var handler = function() {
      counter++
    }

    el.on('b/4', handler).on('c-d', handler).on('d:x', handler)

    el.one('d:x', function(arg) {
      expect(arg).to.be(true)
    })

    el.trigger('b/4').trigger('c-d').trigger('d:x', true)

    expect(counter).to.be(3)

  })

  it('one', function() {

    el.one('g', function() {
      expect(++counter).to.be(1)
    })

    el.trigger('g').trigger('g')

  })

  it('one & on', function() {

    el.one('y', function() {
      counter++
    }).on('y', function() {
      counter++
    }).trigger('y').trigger('y')

    expect(counter).to.be(3)

  })

  it('one & on sharing the same handler', function() {
    var handler1 = function() { counter++ },
      handler2 = function() { counter++ }

    el.one('foo', handler1)
      .on('foo', handler2)
      .one('foo2', handler2)
      .on('foo2', handler1)

    el
      .trigger('foo')
      .trigger('foo')
      .trigger('foo')
      .trigger('foo2')
      .trigger('foo2')

    expect(counter).to.be(7)

  })

  it('Remove listeners', function() {

    function r() {
      expect(++counter).to.be(1)
    }

    el.on('r', r).on('s', r).off('s', r).trigger('r').trigger('s')

  })

  it('Removes duplicate callbacks on off for specific handler', function() {

    function func() {
      counter++
    }

    el.on('a1', func).on('a1', func).trigger('a1').off('a1', func).trigger('a1')

    expect(counter).to.be(2)

  })

  it('is able to trigger events inside a listener', function() {

    var e2 = false

    el.on('e1', function() { this.trigger('e2') })
    el.on('e2', function() { e2 = true })

    el.trigger('e1')

    expect(e2).to.be(true)

  })

  it('listen all the events', function() {

    function func() {
      if (!counter) {
        expect(arguments[0]).to.be('a')
        expect(arguments[1]).to.be('foo')
        expect(arguments[2]).to.be('bar')
      } else {
        expect(['b', 'c']).to.contain(arguments[0])
      }
      counter++
    }

    el.on('*', func)

    el.trigger('a', 'foo', 'bar')
    el.trigger('b')
    el.trigger('c')

    expect(counter).to.be(3)

  })

  it('remove only the all listeners', function() {

    function func() {
      counter ++
    }
    function func2() {
      counter ++
    }

    el
      .on('*', func)
      .on('*', func2)
      .on('foo', func)
      .off('*', func)
      .trigger('foo')
      .off('*')
      .trigger('foo')

    expect(counter).to.be(2)

  })

  it('listen all the events only once', function() {

    function func() {
      if (!counter) {
        expect(arguments[0]).to.be('a')
        expect(arguments[1]).to.be('foo')
        expect(arguments[2]).to.be('bar')
      }
      counter++
    }

    el.one('*', func)

    el.trigger('a', 'foo', 'bar')
    el.trigger('b')
    el.trigger('c')

    expect(counter).to.be(1)

  })

  it('Multiple arguments', function() {

    el.on('j', function(a, b) {
      expect(a).to.be(1)
      expect(b[0]).to.be(2)
    })

    el.trigger('j', 1, [2])

  })

  it('Remove all listeners', function() {

    function fn() {
      counter++
    }

    el.on('aa', fn).on('aa', fn).on('bb', fn)
    el.off('*')

    el.trigger('aa bb')

    expect(counter).to.be(0)

  })

  it('Remove specific listener', function() {

    var one = 0,
      two = 0

    function fn() {
      one++
    }

    el.on('bb', fn).on('bb', function() {
      two++
    })

    el.trigger('bb')
    el.off('bb', fn)
    el.trigger('bb')

    expect(one).to.be(1)
    expect(two).to.be(2)

  })

  it('should not throw internal error', function() {

    el.off('non-existing', function() {})

  })

  it('multi off', function() {
    var fn = function() { counter++ }

    el.on('foo', fn).on('bar', fn)
    el.off('foo bar', fn)
    el.trigger('foo bar')
    expect(counter).to.be(0)
  })

  it('remove handler while triggering', function() {

    function handler() {
      el.off('rem', handler)
    }

    el.on('rem', handler)

    el.on('rem', function() {
      counter++
    })

    el.on('rem', function() {
      counter++
    })

    el.trigger('rem')

    expect(counter).to.be(2)

  })

  it('Do not block callback throwing errors', function() {

    el.on('event', function() { counter++; throw 'OH NOES!' })
    el.on('event', function() { counter++ })

    expect(el.trigger).withArgs('event').to.throwException()
    expect(counter).to.be(1)

  })

  it('The one event is called once also in a recursive function', function() {
    el.one('event', function() {
      counter ++
      el.one('event', function() {
        counter ++
      })
    })
    el.trigger('event')
    expect(counter).to.be(1)
    el.trigger('event')
    expect(counter).to.be(2)
  })

})

