const express = require('express');
const cors = require('cors');
const path = require('path');

// Create a new express application named 'app'
const app = express();
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`);
	next();
});

// Configure the CORs middleware
app.use(cors());

// Import and configure app to use the routes which defined in routes.js
const api = require('./routes/routes');
app.use('/api/', api);

// This middleware informs the express application to serve compiled React files
if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static(path.join(__dirname, 'frontend/build')));

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
	});
}

// Catch any bad requests
app.get('*', (req, res) => {
	res.status(200).json({
		message: 'Success',
	});
});

app.listen(port, () => console.log(`Server running at: ${port}`));
