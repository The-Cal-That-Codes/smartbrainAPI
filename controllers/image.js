
const Clarifai = require('clarifai');

 const app = new Clarifai.App({
 apiKey: "e2bee36749a94a34b70c39a896282376",
}); 

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
  	res.json(data);
  })
  .catch(err => res.status(400).json('unable to communicate with API' + err))
}


const handleimage = (req, res, db) => {
	const{id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleimage,
  handleApiCall
};