
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
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

//this compile the schema into model or class, so it's now class/bluprint
const Course = mongoose.model('Course', courseSchema);

/////////UPDATING IN MONGODB///////////
//1st Approach:
//Query first
//findById()
//modify its properties
//save()
async function updateCourse(id){


    const course = await Course.findById(id);

    if(!course) return;

    course.isPublished = true;
    course.author = 'Updated Author';

    const result = await course.save();
    console.log(result);
}

updateCourse('68d0bd63228c7f78be442721');

//2nd Approach:
//update first
//update directly
//optionally: get the updated document

async function updateCourse(id){


    const result = await Course.update({_id: id}, {
        $set: {
            isPublished: true,
            author: "Ashed"
        }
    });
    console.log(result);
}

updateCourse('68d0bd63228c7f78be442722');

updateCourse('68d0bd63228c7f78be442721');

///UPDATE AND RETURN IT'S ORIGINAL DOCUMENTS///////////

async function updateCourseAndReturnOld(id){


    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            isPublished: true,
            author: "Nafi"
        }
    });
    console.log(result);
}

updateCourseAndReturnOld('68d0bd63228c7f78be442725');




///UPDATE AND RETURN THE UPDATED DOCUMENTS///////////

async function updateCourseAndReturnNew(id){


    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            isPublished: false,
            author: "Nao"
        }
    }, {new: true});
    console.log(result);
}

updateCourseAndReturnNew('68d0bd63228c7f78be442720');


///REMOVE AND RETURN THE REMOVED DOCUMENTS///////////

async function removeCourse(id){
    const result = await Course.deleteOne({_id: id});
    // const result = await Course.deleteMany({_id: id});
    // const course = await Course.findByIdAndRemove({_id: id}); //return null if file not exist
    console.log(result);

    // console.log(course);
}

removeCourse('68d0bd63228c7f78be442725');


