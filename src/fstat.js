import fs from 'fs'
import Future from 'funko/lib/future'

const fstat = fd =>
	Future((reject, resolve) =>
		fs.fstat(fd, (error, stat) => error ?
			reject(error) :
			resolve(stat)
		)
	)

export default fstat
