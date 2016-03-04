import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import fchown from './fchown'
import open from './open.test'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	all([ open, close ])
	// Future Error Module
	.chain(([ open, close ]) => 
		open(null, 'r+', path.join(__dirname, '../test/fixtures/fchown.txt'))
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

