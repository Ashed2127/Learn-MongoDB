
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/playground';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log(`Connected to MongoDB..`);
});

//This is a schema like a class or bluprint for courses, but it must be compiled using model to be class.
const courseSchema = new mongoose.Schema({
    //builin validator from mongoose
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    //builin validator from mongoose
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,

    //Custom validator
    tags: {
        type: Array,
        validate:{ validator: function(v) {
        return v && v.length > 0; //this means if v has a value and it must greatertha 0

        },
        message: 'A course should have at least one tag.'}

    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    //builin validator from mongoose
    price: {
        type: Number,
        required: function()  { return this.isPublished;}
    }
});

//this compile the schema into model or class, so it's now class/bluprint
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

    ////////INSERTION IN MOGNGODB///////////
    //Object creation the class
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Ashed',
        tags: null,
        isPublished: true,
        price: 45
    });

    try {
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        console.log(ex.message);
    }

}

createCourse();
