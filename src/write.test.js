import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import open from './open.test'
import testFileContent from '../test/test-file-content'
import testFilePath from '../test/test-file-path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import write from './write'

export default cacheFuture(
	all([
		open
		// Future Error Module
		.chain(open => open(null, 'w+', testFilePath(__filename)))
		// Future Error FileDescriptor
		.chain(fd => {
			const buffer = new Buffer(testFileContent)
			return write(0, buffer.length, 0, buffer, fd)
			.chain(wrapCatchable(bytesWritten => {
				expect(bytesWritten).to.eql(buffer.length)
				return fd
			}))
		}),
		// Future Error FileDescriptor
		close
	])
	.chain(([ fd, close ]) => close(fd))
	// Future Error FileDescriptor
	.map(() => write)
	// Future Error Module
)
