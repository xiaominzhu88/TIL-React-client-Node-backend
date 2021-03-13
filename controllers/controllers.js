// Call this function, it will respond to the FRONTEND with status code "200" and a JSON object with 'Hello from the server!'

const sayHello = (req, res, next) => {
	res.status(200).json({
		body: 'Hello I am from the server!',
	});
};

module.exports.sayHello = sayHello;
