import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import fchmod from './fchmod'
import open from './open.test'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	all([ open, close, testFile(__filename) ])
	// Future Error Module
	.chain(([ open, close, path ]) => 
		open(null, 'r+', path)
		// Future Error FileDescriptor
		.chain(fchmod(0o664))
		// Future Error FileDescriptor
		.chain(wrapCatchable(fd => {
			expect(fd).to.be.a.number()
			return close(fd)
		}))
		// Future Error null
		.map(() => fchmod)
		// Future Error Module
	)
	// Future Error Module
)
