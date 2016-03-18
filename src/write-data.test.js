import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import close from './close.test'
import expect from 'must'
import open from './open.test'
import testFileContent from '../test/test-file-content'
import testFilePath from '../test/test-file-path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import writeData from './write-data'

export default cacheFuture(
	all([ open, close ])
	// Future Error [ Module ]
	.chain(([ open, close ]) =>
		open(null, 'w+', testFilePath(__filename))
		// Future Error FileDescriptor
		.chain(fd => {
			return writeData('utf-8', 0, testFileContent, fd)
			// Future Error Number
			.chain(wrapCatchable(bytesWritten => {
				expect(bytesWritten).to.eql(testFileContent.length)
				return close(fd)
			}))
			// Future Error null
		})
	)
	// Future Error null
	.map(() => writeData)
	// Future Error Module
)
