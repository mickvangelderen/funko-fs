import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const fchown = curry(3, (uid, gid, fd) =>
	Future((reject, resolve) =>
		fs.fchown(fd, uid, gid, error => error ?
			reject(error) :
			resolve(fd)
		)
	)
)

export default fchown
