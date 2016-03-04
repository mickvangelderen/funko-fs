import fs from 'fs'
import Future from 'funko/lib/future'

const lstat = fs.lstat ? path =>
	Future((reject, resolve) =>
		fs.lstat(path, (error, stat) => error ?
			reject(error) :
			resolve(stat)
		)
	)
: undefined

export default lstat
