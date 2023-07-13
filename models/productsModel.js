const products = require('../data/products.json')
const { writeDataToFile } = require('../utils')
const findAll = () => {
  return new Promise((resolve, rejecte) => {
    resolve(products)
  })
}

const findById = (id) => {
  return new Promise((resolve, rejecte) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

const create = (product) => {
  return new Promise((resolve, rejecte) => {
    const newProduct = { ...product, id: new Date().getTime().toString() }
    products.push(newProduct)
    writeDataToFile('./data/products.json', JSON.stringify(products))
    resolve(newProduct)
  })
}

const update = (productData, id) => {
  return new Promise((resolve, rejecte) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = { id, ...productData }
    writeDataToFile('./data/products.json', JSON.stringify(products))
    resolve(products[index])
  })
}

const remove = (id) => {
  return new Promise((resolve, rejecte) => {
    const filteredProducts = products.filter((p) => p.id !== id)
    writeDataToFile('./data/products.json', JSON.stringify(filteredProducts))
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
}
