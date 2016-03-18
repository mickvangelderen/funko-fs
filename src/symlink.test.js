import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'
import symlink from './symlink'
import testFile from '../test/test-file'
import testFilePath from '../test/test-file-path'
import unlink from './unlink.test'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	all([
		testFile(__filename), 
		// Future Error Path
		unlink
		// Future Error Module
		.chain(unlink => unlink(testFilePath('symlink-link')))
		// Future Error Path
		.chainLeft(error => error && error.code === 'ENOENT'
			? resolved(testFilePath('symlink-link'))
			: rejected(error)
		)
		// Future Error Path
	])
	// Future Error [ Path, Path ]
	.chain(([ path, linkPath ]) =>
		symlink(null, path, linkPath)
		.chainLeft(error => error && error.code === 'EPERM'
			? resolved(linkPath) // Windows
			: rejected(error)
		)
	)
	// Future Error Path
	.chain(wrapCatchable(path => {
		expect(path).to.eql(testFilePath('symlink-link'))
		return symlink
	}))
	// Future Error Module
)
