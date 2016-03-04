import fs from 'fs'
import Future from 'funko/lib/future'

const readdir = path =>
	Future((reject, resolve) =>
		fs.readdir(path, (error, files) => error ?
			reject(error) :
			resolve(files)
		)
	)

export default readdir
