import fs from 'fs'
import Future from 'funko/lib/future'

const stat = path =>
	Future((reject, resolve) =>
		fs.stat(path, (error, stats) => error ?
			reject(error) :
			resolve(stats)
		)
	)

export default stat
