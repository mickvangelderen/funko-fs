import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const ftruncate = curry(2, (len, fd) =>
	Future((reject, resolve) =>
		fs.ftruncate(fd, len, error => error ?
			reject(error) :
			resolve(fd)
		)
	)
)

export default ftruncate
