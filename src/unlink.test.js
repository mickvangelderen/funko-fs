import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import unlink from './unlink'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import testFile from '../test/test-file'
import testFilePath from '../test/test-file-path'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(unlink)
	// Future Error Path
	.chain(wrapCatchable(path => {
		expect(path).to.eql(testFilePath(__filename))
		return unlink
	}))
	// Future Error Module	
)
