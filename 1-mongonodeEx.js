
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

//this compile the schema into model or class, so it's now class/bluprint
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

////////INSERTION IN MOGNGODB///////////
//Object creation the class
const course = new Course({
	name: 'Angular Course',
	author: 'Ashed',
	tags: ['angular', 'Frontend'],
	isPublished: true
});


const result = await course.save();
console.log(result);

}
// ////////SELECTION IN MONGODB////////////////
// async function getCourses(){
// ///////////////////////////////////
// 	//COMPARISON QUERIES
// 	//eq (equal)
// 	//ne (not equal)
// 	//gt (greater than)
// 	//gte (greater tham or equal to)
// 	//lt (less than)
// 	//lte (less than or equal to)
// 	//in
// 	//nin (not in)
// ///////////////////////////////////
// 	//LOGICAL OPERATORS
// 	//or
// 	//and
// ///////////////////////////////////
// 	//REGULAR EXPRESSIONS
// 	//^ :for start
// 	//$ :for end
// 	//i :for insensitive
// 	//.* :for 0 or more character
// ///////////////////////////////////
// 	const courses = await Course
// 	.find({author: 'Ashed', isPublished: true}) //to filter specifically
// 	////COMPARISION OPERATOR
// 	// .find({price: {$gt: 10, $lt: 20}})
// 	// .find({price: {$in: [10, 15, 20]}});
//
// 	// .find()
// 	////LOGICAL OPERATORS
// 	// .or([{author: 'Ashed'}, {isPublished: true}])
// 	// .and([])
// 	////REGULAR EXPRESSIONS(case sensitive), add i after forward slash to make insensitive
// 	////start with Ashed////
// 	// .find({author: /^Ashed/})//sensitive
// 	// //end with Ashed
// 	// .find({author: /Ashed$/}) //sensitive
// 	// .find({author: /Ashed$/i}) //insensitive
// 	////Contains Ashed////
// 	// .find({author: /.*Ashed.*/i}) //select Ashed anywhere
// 	// .limit(10) //to limit its amount
// 	//to ACCESS document in a given page(pagination)
// 	// const pageNumber = 2;
// 	// const pageSize = 10;
// 	// .skip((pageNumber - 1) * pageSize)
// 	// .limit(pageSize)
// 	.sort({name: 1}) //1 for ascending -1 for descending order
// 	// .select({name: 1, tags: 1}); //to select name & tags only
// 	.count();
// 	console.log(courses);
// }
//
// getCourses();

/////////UPDATING IN MONGODB///////////
async function updateCourse(id){
	//1st Approach:
	//Query first
	//findById()
	//modify its properties
	//save()

	const course = await Course.findById(id);
	if(!course) return;

	course.isPublished = true;
	course.author = 'New Author';

	const result = await course.save();
	console.log(result);
}
/////ALTERNATIVE/////
	// course.set({
	// isPublished: true,
	// author: 'New Author'});

	//2nd Approach:
	//update first
	//update directly
	//optionally: get the updated document

updateCourse('68d0bd63228c7f78be442722');



