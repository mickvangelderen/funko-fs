import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import link from './link'
import rejected from 'funko/lib/future/resolved'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import testFilePath from '../test/test-file-path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(path => link(path, testFilePath('link-link')))
	// Future Error Path
	.chainBoth(
		error => {
			if (error.code === 'EEXIST') return resolved(link)
			return rejected(error)
		},
		wrapCatchable(p => {
			expect(p).to.eql(testFilePath('link-link'))
			return link
		})
	)
	// Future Error Module
)
