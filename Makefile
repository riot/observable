# Command line paths
KARMA = ./node_modules/karma/bin/karma
ISTANBUL = ./node_modules/karma-coverage/node_modules/.bin/istanbul
ESLINT = ./node_modules/eslint/bin/eslint.js
MOCHA = ./node_modules/mocha/bin/_mocha
COVERALLS = ./node_modules/coveralls/bin/coveralls.js


build:
	# building
	@ mkdir -p dist
	# umd
	@ cat lib/wrap/start.frag lib/index.js lib/wrap/end.frag > dist/observable.js
	@ cat lib/index.js > dist/es6.observable.js
	# es6
	@ echo 'export default observable' >> dist/es6.observable.js
	# riot
	@ cat lib/index.js | sed -e 's/var observable/riot.observable/g' > dist/riot.observable.js

test: eslint test-karma

eslint:
	# check code style
	@ $(ESLINT) -c ./.eslintrc lib

test-karma:
	@ $(KARMA) start test/karma.conf.js

perf: build
	# run the performance tests
	@ node test/bench/speed

test-coveralls:
	@ RIOT_COV=1 cat ./coverage/lcov.info ./coverage/report-lcov/lcov.info | $(COVERALLS)


.PHONY: build test eslint test-karma test-coveralls
