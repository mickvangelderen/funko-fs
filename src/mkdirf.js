import curry from 'funko/lib/curry'
import mkdir from './mkdir'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'
import stat from './stat'

// Assuming it is more likely for the directory to already exist, we will stat first. 

const mkdirf = curry(2, (mode, path) =>
	mkdir(mode, path)
	.chainLeft(error => error && error.code === 'EEXIST'
		? stat(path)
		.chain(stat => {
			if (stat.isDirectory()) return resolved(path)
			if (stat.isFile()) return rejected(new Error(`Unable to create directory because "${path}" points to a file.`))
			return rejected(new Error(`Unable to create directory because "${path}" is not a file nor a directory.`))
		})
		: rejected(error)
	)
)

export default mkdirf
