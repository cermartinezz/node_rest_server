const  { Schema, model } = require('mongoose')

const CategorySchema = Schema({
	name: {
		type: String,
		required: [true, 'The name is required']
	},
	status: {
		type: Boolean,
    default: true,
		required: [true, 'The status is required'],
		unique: true
	},
	user: {
		type: Schema.Types.ObjectId,
    ref: 'User',
		required: [true, 'The user is required']
	}
})

CategorySchema.methods.toJSON = function() {
	const {__v,_id, ...category} = this.toObject();
	category.uid = _id;
	return category;
}


module.exports = model('Category', CategorySchema);