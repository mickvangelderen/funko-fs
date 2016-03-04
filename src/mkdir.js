import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const mkdir = curry(2, (mode, path) =>
	Future((reject, resolve) =>
		fs.mkdir(path, mode, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default mkdir
