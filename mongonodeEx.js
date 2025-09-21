
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/playground';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) throw err;
	console.log(`Connected to MongoDB..`);
});

//This is a schema like a class or bluprint for courses, but it must be compiled using model to be class.
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: {type: Date, default: Date.now},
	isPublished: Boolean
});
async function createCourse(){

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
	name: 'Nodejs Course',
	author: 'Ashed',
	tags: ['node', 'backend'],
	isPublished: true
});

const result = await course.save();
console.log(result);

}

createCourse();

// course.save()
// 	.then(() => console.log ('Course saved!'))
// 	.catch(err => console.error(err));
//

