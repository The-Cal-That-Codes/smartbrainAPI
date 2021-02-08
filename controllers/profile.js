const handleprofile = (req, res, db, bcrypt) => {
	const{id} = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		user.length ? res.json(user[0]) 
		: res.status(404).json('no such user');
	})
	.catch(err => res.status(400).json('error getting user')) 
}

module.exports = {
	handleprofile: handleprofile
};