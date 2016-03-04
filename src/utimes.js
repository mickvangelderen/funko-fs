import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const utimes = curry(3, (atime, mtime, path) =>
	Future((reject, resolve) =>
		fs.utimes(path, atime, mtime, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default utimes
