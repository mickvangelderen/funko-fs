import curry from 'funko/lib/curry'
import mkdirf from './mkdirf'
import rejected from 'funko/lib/future/rejected'
import { dirname } from 'path'

const mkdirp = curry(2, (mode, path) =>
	mkdirf(mode, path)
	.chainLeft(error => error && error.code === 'ENOENT'
		? mkdirp(mode, dirname(path))
		.chain(() => mkdirf(mode, path))
		: rejected(error)
	)
)

export default mkdirp
