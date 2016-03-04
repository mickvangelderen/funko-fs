import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const open = curry(3, (mode, flags, path) =>
	Future((reject, resolve) =>
		fs.open(path, flags, mode, (error, fd) => error ?
			reject(error) :
			resolve(fd)
		)
	)
)

export default open
