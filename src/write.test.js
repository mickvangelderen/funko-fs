import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import open from './open.test'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import write from './write'
import { EOL } from 'os'

function test([ open, close ]) {
	return open(null, 'w+', path.join(__dirname, '../test/fixtures/write.txt'))
	// Future Error FileDescriptor
	.chain(fd => {
		const buffer = new Buffer(`Example content.${EOL}`)
		return write(0, buffer.length, 0, buffer, fd)
		// Future Error Number
		.chain(wrapCatchable(bytesWritten => {
			expect(bytesWritten).to.eql(16 + EOL.length)
			return close(fd)
		}))
		// Future Error null
	})
	// Future Error null
}

export default cacheFuture(
	all([ open, close ])
	// Future Error [ Module ]
	.chain(test)
	// Future Error null
	.map(() => write)
	// Future Error Module
)
