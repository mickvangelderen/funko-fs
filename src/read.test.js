import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import open from './open.test'
import path from 'path'
import read from './read'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import { EOL } from 'os'

function test([ open, close ]) {
	return open(null, 'r+', path.join(__dirname, '../test/fixtures/read.txt'))
	// Future Error FileDescriptor
	.chain(fd => {
		const buffer = new Buffer(20).fill(0)
		return read(0, 20, 0, buffer, fd)
		// Future Error Number
		.chain(wrapCatchable(bytesRead => {
			expect(bytesRead).to.eql(16 + EOL.length)
			const expected = new Buffer(20).fill('\0')
			expected.write(`Example content.${EOL}`)
			expect(buffer.equals(expected)).to.be.true()
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
	.map(() => read)
	// Future Error Module
)
