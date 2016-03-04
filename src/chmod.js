import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const chmod = curry(2, (mode, path) =>
	Future((reject, resolve) =>
		fs.chmod(path, mode, error => error ?
			reject(error) :
			resolve(path)
		)
	)
)

export default chmod
