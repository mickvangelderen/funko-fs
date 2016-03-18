import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import fchown from './fchown'
import open from './open.test'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default typeof process.getuid === 'function'
	? cacheFuture(
		all([ open, close, testFile(__filename) ])
		// Future Error Module
		.chain(([ open, close, path ]) => 
			open(null, 'r+', path)
			// Future Error FileDescriptor
			.chain(fchown(process.getuid(), process.getgid()))
			// Future Error FileDescriptor
			.chain(wrapCatchable(fd => {
				expect(fd).to.be.a.number()
				return close(fd)
			}))
			// Future Error null
			.map(() => fchown)
			// Future Error Module
		)
		// Future Error Module
	)
	: resolved(fchown)

