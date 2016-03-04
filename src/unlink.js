import fs from 'fs'
import Future from 'funko/lib/future'

const unlink = path =>
	Future((reject, resolve) =>
		fs.unlink(path, error => error ?
			reject(error) :
			resolve(path)
		)
	)

export default unlink
