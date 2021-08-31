# Command line paths
KARMA = ./node_modules/karma/bin/karma
ISTANBUL = ./node_modules/karma-coverage/node_modules/.bin/istanbul
ESLINT = ./node_modules/eslint/bin/eslint.js
MOCHA = ./node_modules/mocha/bin/_mocha
COVERALLS = ./node_modules/coveralls/bin/coveralls.js


build:
	# building
	@ node_modules/.bin/tsc
	@ mkdir -p dist
	# umd
	@ cat lib/wrap/start.frag lib/index.js lib/wrap/end.frag | \
	  sed '/export\sdefault/d' | \
	  sed '/sourceMappingURL/d' | \
	  tee dist/observable.js 1> /dev/null
	# es6
	@ cat lib/index.js | \
	  sed '/sourceMappingURL/d' | \
	  tee dist/es6.observable.js 1> /dev/null
	# types
	@ mv lib/index.d.ts dist
	# cleanup
	@ node_modules/.bin/eslint --fix dist
	@ rm lib/index.js*

test: eslint test-karma

eslint:
	# check code style
	@ $(ESLINT) -c ./.eslintrc test/specs

test-karma:
	@ $(KARMA) start test/karma.conf.js

perf: build
	# run the performance tests
	@ node test/bench/speed

test-coveralls:
	@ RIOT_COV=1 cat ./coverage/lcov.info ./coverage/report-lcov/lcov.info | $(COVERALLS)


.PHONY: build test eslint test-karma test-coveralls
