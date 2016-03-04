import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const realpath = curry(2, (cache, path) =>
	Future((reject, resolve) =>
		fs.realpath(path, cache, (error, resolvedPath) => error ?
			reject(error) :
			resolve(resolvedPath)
		)
	)
)

export default realpath
