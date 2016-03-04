import fs from 'fs'
import Future from 'funko/lib/future'

const rmdir = path =>
	Future((reject, resolve) =>
		fs.rmdir(path, error => error ?
			reject(error) :
			resolve(path)
		)
	)

export default rmdir
