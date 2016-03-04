import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const truncate = curry(2, (len, path) =>
	Future((reject, resolve) =>
		fs.truncate(path, len, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default truncate
