
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
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,

    },
    author: String,

    //Custom validator
    tags: {
        type: Array,
        validate:{
            validator: async function(v) {

                    //Do some async work
                    const result = await v && v.length > 0;
                    return result ;

                },
        message: 'A course should have at least one tag.'}

    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    //builin validator from mongoose
    price: {
        type: Number,
        required: function()  { return this.isPublished;},
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),

    }
});

//this compile the schema into model or class, so it's now class/bluprint
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

    ////////INSERTION IN MOGNGODB///////////
    //Object creation the class
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Ashed',
        tags: ['frontend'],
        isPublished: true,
        price: 46.8
    });

    try {
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        console.log(ex.message);
        //Validation errors
        // for (field in ex.errors)
        //     console.log(ex.errors[field]);
        console.log(ex.errors.category.message);

    }

}

createCourse();
