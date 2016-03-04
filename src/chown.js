import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const chown = curry(3, (uid, gid, path) =>
	Future((reject, resolve) =>
		fs.chown(path, uid, gid, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default chown
