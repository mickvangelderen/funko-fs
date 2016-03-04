import fs from 'fs'
import Future from 'funko/lib/future'

const fsync = fd =>
	Future((reject, resolve) =>
		fs.fsync(fd, error => error ?
			reject(error) :
			resolve(fd)
		)
	)

export default fsync
