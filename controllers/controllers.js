// Call this function, it will respond to the FRONTEND with status code "200" and a JSON object with 'Hey, I am from server, send me something from frontend!'

const sayHello = (req, res, next) => {
	res.status(200).json({
		body: 'Hey, I am from server, send me something from frontend: 👆 ',
		param: Object.keys(req.body).join(),
	});
};

module.exports.sayHello = sayHello;
