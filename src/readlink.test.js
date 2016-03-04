import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import readlink from './readlink'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	readlink(path.join(__dirname, '../test/fixtures/readlink.txt'))
	// Future Error Stat
	.chainBoth(
		error => {
			if (error.code === 'EINVAL') return resolved()
			return rejected(error)
		}, 
		wrapCatchable(linkString => {
			expect(linkString).to.be.a.string()
			return readlink
		})
	)
	// Future Error Module
)
