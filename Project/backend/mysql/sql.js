const adminOrder = require('./admin/adminOrder')
const adminBoard = require('./admin/adminBoard')
const adminMember = require('./admin/adminMember')
const adminProduct = require('./admin/adminProduct')

module.exports = {
    ...adminBoard,
    ...adminOrder,
    ...adminMember,
    ...adminProduct

}