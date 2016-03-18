import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import fstat from './fstat'
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
			fstat(fd)
			// Future Error Stat
			.chain(wrapCatchable(stat => {
				expect(stat).to.be.an.object()
				return close(fd)
			}))
			// Future Error FileDescriptor
		)
		// Future Error FileDescriptor
		.map(() => fstat)
		// Future Error Module
	)
)
