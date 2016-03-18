import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import testFile from '../test/test-file'
import testFileContent from '../test/test-file-content'
import testFilePath from '../test/test-file-path'
import truncate from './truncate'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(truncate(testFileContent.length))
	// Future Error Path
	.chain(wrapCatchable(path => {
		expect(path).to.eql(testFilePath(__filename))
		return truncate
	}))
	// Future Error Module
)
