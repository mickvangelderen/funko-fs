import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import link from './link'
import path from 'path'
import rejected from 'funko/lib/future/resolved'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	link(
		path.join(__dirname, '../test/fixtures/link-src.txt'),
		path.join(__dirname, '../test/fixtures/link-dst.txt')
	)
	// Future Error Path
	.chainBoth(
		error => {
			if (error.code === 'EEXIST') return resolved(link)
			return rejected(error)
		},
		wrapCatchable(p => {
			expect(p).to.eql(path.join(__dirname, '../test/fixtures/link-dst.txt'))
			return link
		})
	)
	// Future Error Module
)
