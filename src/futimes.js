import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const futimes = curry(3, (atime, mtime, fd) =>
	Future((reject, resolve) =>
		fs.futimes(fd, atime, mtime, error => error ?
			reject(error) :
			resolve(fd)
		)
	)
)

export default futimes
