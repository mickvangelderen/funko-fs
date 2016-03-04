import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const link = curry(2, (srcpath, dstpath) =>
	Future((reject, resolve) =>
		fs.link(srcpath, dstpath, error => error ?
			reject(error) :
			resolve(dstpath)
		)
	)
)

export default link
