const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require('../models/productsModel')
const { getBodyData } = require('../utils')

// @desc Get All Products
const getProducts = async (req, res) => {
  const products = await findAll()
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify(products))
}

// @desc Get Single Product
const getProduct = async (req, res, id) => {
  const product = await findById(id)
  if (!product) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ messege: 'Product Not Found' }))
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(product))
  }
}

// @desc create a product

const createProduct = async (req, res) => {
  const body = await getBodyData(req)
  const { name, price, description } = JSON.parse(body)
  const product = {
    name,
    description,
    price,
  }
  const newProduct = await create(product)
  res.writeHead(201, {
    'Content-Type': 'application/json',
  })

  res.end(JSON.stringify(newProduct))
}

const updateProduct = async (req, res, id) => {
  const product = await findById(id)

  if (!product) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ messege: 'Product Not Found' }))
  } else {
    const body = await getBodyData(req)
    const { name, price, description } = JSON.parse(body)
    const productData = {
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
    }
    const updatedProduct = await update(productData, id)
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(updatedProduct))
  }
}

const deleteProduct = async (req, res, id) => {
  await remove(id)
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify({ messege: `Product: ${id} has been deleted` }))
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
