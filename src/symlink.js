import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const symlink = curry(3, (type, target, path) =>
	Future((reject, resolve) =>
		fs.symlink(target, path, type, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default symlink
