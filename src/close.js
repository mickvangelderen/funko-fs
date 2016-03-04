import fs from 'fs'
import Future from 'funko/lib/future'

const close = fd =>
	Future((reject, resolve) =>
		fs.close(fd, error => error ?
			reject(error) :
			resolve(null)
		)
	)

export default close
