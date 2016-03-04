import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const write = curry(5, (position, length, offset, buffer, fd) =>
	Future((reject, resolve) =>
		fs.write(fd, buffer, offset, length, position, (error, bytesWritten) => error ?
			reject(error) :
			resolve(bytesWritten)
		)
	)
)

export default write
