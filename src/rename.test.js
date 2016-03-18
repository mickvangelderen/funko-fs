import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import rename from './rename'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import testFile from '../test/test-file'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(path => rename(path, path))
	// Future Error Stat
	.chain(
		wrapCatchable(path => {
			expect(path).to.be.a.string()
			return rename
		})
	)
	// Future Error Module
)
