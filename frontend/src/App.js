import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
	const [response, setResponse] = useState({});

	useEffect(() => {
		axios.get('/api/sayHello').then((res) => {
			console.log('res: ', res);
			const response = res.data;
			setResponse(response);
		});
	}, []);

	return (
		<div className="App">
			<h1>Hello from Frontend!</h1>
			<h1>{response.body}</h1>
		</div>
	);
};

export default App;
