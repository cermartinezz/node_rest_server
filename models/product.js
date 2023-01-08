const  { Schema, model } = require('mongoose')

const ProductSchema = Schema({
	name: {
		type: String,
		required: [true, 'The name is required'],
    unique: true
	},
	status: {
		type: Boolean,
    default: true,
		required: [true, 'The status is required'],
	},
	user: {
		type: Schema.Types.ObjectId,
    ref: 'User',
		required: [true, 'The user is required']
	},
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'The category is required']
  },
  description: {
    type: String
  },
  avalilable: {
    type: Boolean,
    default: true,
  }
})

ProductSchema.methods.toJSON = function() {
	const {__v,_id, status, ...product} = this.toObject();
	product.uid = _id;
	return product;
}


module.exports = model('Product', ProductSchema);