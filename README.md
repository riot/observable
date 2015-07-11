[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Coverage Status][coverage-image]][coverage-url]

# Observable

Observable is a generic tool to send and receive events. It's a common pattern to isolate modules without forming a dependency or "coupling". By using events a large program can be broken into smaller and simpler units. Modules can be added, removed, or modified without affecting the other parts of the application.

A common practice is to split the application into a single core and multiple extensions. The core sends events any time something remarkable happens: a new item is being added, an existing item is being removed, or something is loaded from the server.

By using the observable the extensions can listen to these events and react to them. They extend the core so that the core is not aware of these modules. This is called "loose coupling".

These extensions can be custom tags (UI components) or non-UI modules.

Once the core and events are carefully designed the team members are enabled to develop the system on their own without disturbing others.

## Installation

### Npm

Not available yet

### Bower

Not available yet

## Api

### observable(el)

Adds [Observer](http://en.wikipedia.org/wiki/Observer_pattern) support for the given object `el` or if the argument is empty a new observable instance is created and returned. After this the object is able to trigger and listen to events. For example:

``` js
function Car() {

  // Make Car instances observable
  observable(this)

  // listen to 'start' event
  this.on('start', function() {
    // engine started
  })

}

// make a new Car instance
var car = new Car()

// trigger 'start' event
car.trigger('start')
```

@returns the given object `el` or a new observable instance


## Installation

### Npm

### Bower

## Api

### el.on(events, callback) | #observable-on

Listen to the given space separated list of `events` and execute the `callback` each time an event is triggered.

``` js
// listen to single event
el.on('start', function() {

})

// listen to multiple events, the event type is given as the argument
el.on('start stop', function(type) {

  // type is either 'start' or 'stop'

})
```

@returns `el`

## Installation

### Npm

### Bower

## Api

### el.one(event, callback) | #observable-one

Listen to the given `event` and execute the `callback` at most once.

``` js
// run the function once, even if 'start' is triggered multiple times
el.one('start', function() {

})
```

@returns `el`

## Installation

### Npm

### Bower

## Api

### el.off(events) | #observable-off

Removes the given space separated list of event listeners

``` js
el.off('start stop')
```

@returns `el`

## Installation

### Npm

### Bower

## Api

### el.off(events, fn)

Removes the given callback from the list of events

``` js
function doIt() {
  console.log('starting or ending')
}

el.on('start middle end', doIt)

// remove a specific listener from start and end events
el.off('start end', doIt)
```

@returns `el`

## Installation

### Npm

### Bower

## Api

### el.off('*')

Removes all listeners from all event types.

@returns `el`


## Installation

### Npm

### Bower

## Api

### el.trigger(event) | #observable-trigger

Execute all callback functions that listen to the given `event`

``` js
el.trigger('start')
```

@returns `el`

## Installation

### Npm

### Bower

## Api

### el.trigger(event, arg1 ... argN)

Execute all callback functions that listen to the given `event`. Any number of extra parameters can be provided for the listeners.

``` js
// listen to 'start' event and expect extra arguments
el.on('start', function(engine_details, is_rainy_day) {

})

// trigger start event with extra parameters
el.trigger('start', { fuel: 89 }, true)

```

@returns `el`


[travis-image]:https://img.shields.io/travis/riot/observable.svg?style=flat-square
[travis-url]:https://travis-ci.org/riot/observable

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/riot-observable.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/riot-observable.svg?style=flat-square
[npm-url]:https://npmjs.org/package/riot-observable

[coverage-image]:https://img.shields.io/coveralls/riot/observable/master.svg?style=flat-square
[coverage-url]:https://coveralls.io/r/riot/observable/?branch=master
