import fs from 'fs'
import Future from 'funko/lib/future'

const readlink = path =>
	Future((reject, resolve) =>
		fs.readlink(path, (error, linkString) => error ?
			reject(error) :
			resolve(linkString)
		)
	)

export default readlink
