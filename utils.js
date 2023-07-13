const fs = require('fs')

const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf-8', (error) => {
    console.log(error)
  })
}

const getBodyData = (req) => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      resolve(body)
    })
  })
}

module.exports = {
  writeDataToFile,
  getBodyData,
}
