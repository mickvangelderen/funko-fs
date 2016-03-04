import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const fchmod = curry(2, (mode, fd) =>
	Future((reject, resolve) =>
		fs.fchmod(fd, mode, error => error ?
			reject(error) :
			resolve(fd)
		)
	)
)

export default fchmod
