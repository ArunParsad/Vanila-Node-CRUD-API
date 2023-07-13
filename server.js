const http = require('http')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controller/productsController')
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/api/products' && method === 'GET') {
    getProducts(req, res)
  } else if (url.match(/\/api\/products\/\w+/) && method === 'GET') {
    const id = url.split('/')[3]
    getProduct(req, res, id)
  } else if (url === '/api/products' && method === 'POST') {
    createProduct(req, res)
  } else if (url.match(/\/api\/products\/\w+/) && method === 'PUT') {
    const id = url.split('/')[3]
    updateProduct(req, res, id)
  } else if (url.match(/\/api\/products\/\w+/) && method === 'DELETE') {
    const id = url.split('/')[3]
    deleteProduct(req, res, id)
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ messege: 'Route Not Found' }))
  }
})

server.listen(5000, () => {
  console.log('Server Running on port : 5000')
})
