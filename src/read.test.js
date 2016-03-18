import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import open from './open.test'
import read from './read'
import testFile from '../test/test-file'
import testFileContent from '../test/test-file-content'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	all([ open, close, testFile(__filename) ])
	// Future Error [ Module ]
	.chain(([ open, close, path ]) => {
		return open(null, 'r+', path)
		// Future Error FileDescriptor
		.chain(fd => {
			const buffer = new Buffer(20).fill(0)
			return read(0, 20, 0, buffer, fd)
			// Future Error Number
			.chain(wrapCatchable(bytesRead => {
				expect(bytesRead).to.eql(testFileContent.length)
				const expected = new Buffer(20).fill('\0')
				expected.write(testFileContent)
				expect(buffer.equals(expected)).to.be.true()
				return close(fd)
			}))
			// Future Error null
		})
		// Future Error null
	})
	// Future Error null
	.map(() => read)
	// Future Error Module
)
