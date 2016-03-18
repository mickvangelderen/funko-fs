import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import fsync from './fsync'
import open from './open.test'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	all([ open, close, testFile(__filename) ])
	// Future Error [ Module ]
	.chain(([ open, close, path ]) => 
		open(null, 'r+', path)
		// Future Error FileDescriptor
		.chain(fd =>
			fsync(fd)
			// Future Error FileDescriptor
			.chain(wrapCatchable(fd => {
				expect(fd).to.be.an.number()
				return close(fd)
			}))
			// Future Error FileDescriptor
		)
		// Future Error FileDescriptor
		.map(() => fsync)
		// Future Error Module
	)
)
