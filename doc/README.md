# Observable Api


### <a name="constructor"></a> observable(el)

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

### <a name="on"></a> el.on(events, callback, persist)

Listen to the given space separated list of `events` and execute the `callback` each time an event is triggered.

If `persist` is set to `true`, then it will immediately execute `callback` *if* trigger has been
called for the `event`. Useful for eliminating race-conditions with server data.

``` js
// listen to single event
el.on('start', function() {

})

// listen to multiple events, the event type is given as the argument
el.on('start stop', function(type) {

  // type is either 'start' or 'stop'

})

// listen all the events of this observable
el.on('*', function(event, param1, param2) {
  // event will be the name of any event triggered
  // do something with the parameters
})

// delayed event registration
el.trigger('start')
el.on('start', function() {
  // This will execute even though it is setup after the trigger
}, true)

```

@returns `el`

### <a name="one"></a> el.one(event, callback, persist)

Listen to the given space separated list of `events` and execute the `callback` at most once

Persist works the same as `on` event.

``` js
// run the function once, even if 'start' is triggered multiple times
el.one('start', function() {

})
```

@returns `el`

### <a name="off"></a> el.off(events)

Removes the given space separated list of `events` listeners.

``` js
el.off('start stop')
```

@returns `el`

### <a name="off-fn"></a> el.off(events, fn)

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

### <a name="off-all"></a> el.off('*')

Removes all listeners from all event types.

@returns `el`

### <a name="off-all-fn"></a> el.off('*', fn)

Removes the specific callback function called on all the events

@returns `el`

### <a name="trigger"></a> el.trigger(events)

Execute all callback functions that listen to the given space separated list of `events`.

``` js
el.trigger('start')
el.trigger('render update')
```

@returns `el`

### <a name="trigger-args"></a> el.trigger(event, arg1 ... argN)

Execute all callback functions that listen to the given `event`. Any number of extra parameters can be provided for the listeners.

``` js
// listen to 'start' event and expect extra arguments
el.on('start', function(engine_details, is_rainy_day) {

})

// trigger start event with extra parameters
el.trigger('start', { fuel: 89 }, true)

```

@returns `el`
