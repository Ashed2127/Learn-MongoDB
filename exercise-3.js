
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mongo-exercises';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log(`Connected to MongoDB..`);
});

//This is a schema like a class or bluprint for courses, but it must be compiled using model to be class.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: Number,
    price: Number,
    isPublished: Boolean,
    tags: [String],

});

//this compile the schema into model or class, so it's now class/bluprint
const Course = mongoose.model('Course', courseSchema);

async function getCourses(){

    const courses = await Course
    .find({price: {$gt: 40}, name: /.*js.*/i})
    .select({});
    console.log(courses);
}

getCourses();


