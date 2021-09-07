[![Build Status][ci-image]][ci-url]
[![Code Quality][codeclimate-image]][codeclimate-url]
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

## Documentation

- [API (English)](doc/)

## Installation

### Npm

`$ npm install @riotjs/observable --save`

### Bower

`$ bower install @riotjs/observable --save`

[ci-image]:https://img.shields.io/github/workflow/status/riot/observable/test?style=flat-square
[ci-url]:https://github.com/riot/observable/actions

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/@riotjs/observable.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/@riotjs/observable.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@riotjs/observable

[coverage-image]:https://img.shields.io/coveralls/riot/observable/main.svg?style=flat-square
[coverage-url]:https://coveralls.io/r/riot/observable/?branch=main

[codeclimate-image]:https://api.codeclimate.com/v1/badges/d1403f06d0e9467985e3/maintainability
[codeclimate-url]:https://codeclimate.com/github/riot/observable
