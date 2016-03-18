import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import utimes from './utimes'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import testFile from '../test/test-file'
import testFilePath from '../test/test-file-path'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(utimes(new Date(), new Date()))
	// Future Error FileDescriptor
	.chain(wrapCatchable(path => {
		expect(path).to.eql(testFilePath(__filename))
		return utimes
	}))
	// Future Error Module
)
