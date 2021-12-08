import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
	const [response, setResponse] = useState({});
	const [value, setValue] = useState('');
	const [backendValue, setBackendValue] = useState('');

	useEffect(() => {
		axios.get('/api/sayHello').then((res) => {
			const response = res.data;
			setResponse(response);
		});
	}, []);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const send = async (e) => {
		e.preventDefault();
		await axios({
			method: 'POST',
			url: '/api/sayHello',
			data: value,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then((res) => {
				setBackendValue(res.data.param);
			})
			.catch((err) => console.log(err));
	};

	const reset = () => {
		setValue('');
		setBackendValue('');
	};

	return (
		<div className="App">
			<h1>Hi I'm from Frontend!</h1>
			<form onSubmit={send}>
				<input
					value={value}
					onChange={handleChange}
					placeholder="send something to server"
				/>
				<button className="formButton" type="submit">
					Send to SERVER!
				</button>
			</form>
			<section>
				<h1>{!backendValue && response.body}</h1>
				<h1>{backendValue && `Server: You just sent me 👉 ${backendValue}`}</h1>
			</section>
			<button className="resetButton" onClick={reset} type="button">
				Reset
			</button>
		</div>
	);
};

export default App;
