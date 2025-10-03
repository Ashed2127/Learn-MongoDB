import Joi from 'joi'
import express from 'express'
const app = express();
// import 'dotenv/config'

app.use(express.json());

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/genres';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) throw err;
	console.log(`Connected to MongoDB..`);
});

//This is a schema like a class or bluprint for courses, but it must be compiled using model to be class.
const genreSchema = new mongoose.Schema({
	//builin validator from mongoose
	name: {
		type: String,
		required: true,
	}

	//this compile the schema into model or class, so it's now class/bluprint
	const Genre = mongoose.model('Genre', genreSchema);

	async function createGenre(){

		////////INSERTION IN MOGNGODB///////////
		//Object creation the class
		const genre = new Genre({
			name: 'Sia',
		});

		try {
			// await course.validate();
			const result = await genre.save();
			console.log(result);
		}
		catch(ex) {
			console.log(ex.message);

			console.log(ex.errors.name.message);

		}

	}

	createGenre();

	app.get('/api/genres', (req, res)=>{

		const genres = await Genre.find().sort('name'});
		console.log(genres);

		res.send(genres);
})

	app.post('/api/genres/', async (req, res)=>{
		const result = schema.validate(req.body);
		console.log(result);
		if(result.error){
			return res.status(400).send(result.error.details[0].message);
		}

		let genres = genre.Genre({name: req.body.name});
		await genres.save()

		res.send(genres);
	})

	app.put('/api/genres/:id', async (req, res)=>{

		const {error} = genreValidator(req.body);
		if(error){
			return res.status(400).send(result.error.details[0].message);                                                             45              }
	const genre = await Genre.findByIdUpdate(req.params.id, {name: req.body.name}, new: true)
  			res.send(genre);
	});

	app.delete('/api/genres/:id', (req, res)=>{
		const e =  genres.find(c => c.id === parseInt(req.params.id))
		if(!genre) return res.status(404).send('id not found.');

		const index = genres.indexOf(genre);
		genres.splice(index, 1);
		res.send(genre);
	})
	function genreValidator(genre){
		const schema =Joi.object( {
			name: Joi.string().min(3).required() });
		return schema.validate(course);
	}


	const port = process.env.PORT || 4000;
	app.listen(port, ()=> console.log(`Genre running on ${port}`));
