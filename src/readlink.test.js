import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import readlink from './readlink'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(readlink)
	// Future Error Stat
	.chainBoth(
		error => {
			if (error.code === 'EINVAL') return resolved()
			if (error.code === 'UNKNOWN') return resolved() // Windows
			return rejected(error)
		}, 
		wrapCatchable(linkString => {
			expect(linkString).to.be.a.string()
		})
	)
	.map(() => readlink)
	// Future Error Module
)
