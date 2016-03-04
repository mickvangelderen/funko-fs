import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const access = curry(2, (mode, path) =>
	Future((reject, resolve) =>
		fs.access(path, mode, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default access
