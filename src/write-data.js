import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const writeData = curry(4, (encoding, position, data, fd) =>
	Future((reject, resolve) =>
		fs.write(fd, data, position, encoding, (error, bytesWritten) => error ?
			reject(error) :
			resolve(bytesWritten)
		)
	)
)

export default writeData
