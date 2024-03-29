# TIL

**Step-by-Step** for setup an **React** App with **Node.js** Backend

- Create new Repo
- Clone the Repo
- Create package.json

```jsx
npm init
// yarn init
```

_It will ask a couple of questions in order to seed package.json file with some basic information, simply accept the default values with enter, until **(index.js)**, add "server.js" and then enter._

⬇️

```jsx
question name (TIL-React-client-Node-backend):
question version (1.0.0):
question description:
question entry point (index.js): server.js  ▶️ // add this
question repository url (https:...):
question author (...):
question license (MIT):
question private:
success Saved package.json
```

<hr />

## Getting Started ☘️

- Create server.js file inside **Root** directory
- Create React frontend: "frontend" folder in the **Root** directory which contains react frontend

```jsx
npx create-react-app frontend
```

⬇️

<img src='frontend/public/folder.png' height='350px' width='150px' alt='folder'>

- add below to package.json in **Root** directory

```jsx
"frontend": "cd frontend && yarn start"
```

```jsx
yarn frontend
// start frontend server
```

<hr />

## Setup Node.js backend ☘️

1. Create .gitignore file and add file names in order to avoid pushing to Github 🕸

2. Create **Server** ⚙️

- add express, cors

```jsx
yarn add express cors
```

_"express": a Node.js framework_

_"cors": package for providing middleware that can be used to enable CORS_

- In Root package.json should show something like: ⬇️

```jsx
"dependencies": {
		"cors": "^2.8.5",
		"express": "^4.17.1"
	}
```

- Edit server.js content
- Start backend server with

```jsx
node server
```

In Terminal should show below

⬇️

```jsx
TIL-React-client-Node-backend git:(master) ✗ node server
BACK_END_SERVICE_PORT: 5000
```

=> _Navigate to http://localhost:5000 should show_

```jsx
{
"message": "Success"
}
```

<hr />

## Frontend and Backend communication 🎬

👉 First, create _controllers_ folder and controllers.js file

✅ _Controller will respond to the frontend with status "200" and a JSON object_

<img src='frontend/public/server-response.png' height='200px' alt='server-response' >

<br />

👉 Second, create _routes_ folder and routes.js file

✅ _Create an express router object "router" and a "GET" request route handler to call controller "sayHello"_, this will happen wenn the page renders ( useEffect in App.js below )

<img src='frontend/public/get-request.png' height='200px' alt='api-route' >

<br />

👉 Then, add **api** in server.js

```jsx
const api = require('./routes/routes');
app.use('/api/', api);
```

👉 Now, restart backend server

```jsx
node server
```

_Navigate to http://localhost:5000/api/sayHello and it should show "Hey I am from the server!"_

<hr />

## Call API from React frontend 🎬

- Add "axios" inside frontend (App.js) to make api request

```jsx
// command line
cd frontend && yarn add axios && cd ..
```

- Update App.js file

- Use axios to make **GET** request to backend api/sayHello and restart frontend server

```jsx
// import axios in App.js
import axios from 'axios';
...
const [response, setResponse] = useState({});

useEffect(() => {
	axios.get('/api/sayHello').then((res) => {
		const response = res.data;
		setResponse(response);
	});
}, []);
```

- start frontend

```jsx
yarn frontend
```

🌤🌤 😳 ⬇️

_Navigate to http://localhost:3000 it shows "Hi I'm from Frontend!" but without any RESPONSE from backend, and inspect that:⬇️ 👀_

```jsx
createError.js:16 Uncaught (in promise) Error: Request failed with status code 404
    at createError (createError.js:16)
    at settle (settle.js:17)
    at XMLHttpRequest.handleLoad (xhr.js:62)
```

=> This is because server running at 5000 but frontend port is 3000, add proxy 💥

- Add to package.json in **frontend** folder

```jsx
"proxy": "http://localhost:5000"
```

=> Restart backend server and frontend server, page should show

```jsx
Hi I'm from Frontend!
Hey I am from the server,send me something from frontend: 👆
```

<hr />

## Additional Just for fun:: 🧚‍♀️

Add an input field which you can type something and send it to server using axios, to avoid empty body error, add _"body-parser"_

```jsx
yarn add body-parser

// in order to read HTTP POST data, use "body-parser" node module, it is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
```

🦋🦋

```jsx
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
```

React **useState** will update the response and show it on the page

```jsx
const [backendValue, setBackendValue] = useState('');
...
return
...
<h1>{backendValue && `Server: You just sent me 👉 ${backendValue}`}</h1>
...
```

<img src='frontend/public/post-request.png' height='200px' alt='api-route' >

<hr />

☘️☘️☘️
💡 It is also possible to run both server at the same time:

```jsx
yarn add concurrently
```

🔮 update scripts to package.json in **Root** directory:

```jsx
...
// run both with yarn dev
"scripts": {
		"server": "node server.js",
		"frontend": "cd frontend && yarn start",
		"dev": "concurrently --kill-others-on-fail \"yarn frontend\" \"yarn server\""
	},
...
```

<img src='frontend/public/yarnDev.png' height='300px'  alt='script'>

💫💫💫 That's it!

<hr />

## Deploy to production

### 1. Frontend prepatation 👇

- Add script to package.json in **Root** directory

```jsx
"frontend:build": "cd frontend && yarn build"
```

- Run:

```jsx
yarn frontend:build
```

=> a new directory inside frontend folder "build" appears, remove it from .gitignore file in **frontend** directory

### 2. Deployment with heroku 👇

- Create an account on heroku
- Choose "Create new app" and follow the steps

  - Choose Github as method, search Repo

  - Enable Automatic Deploys

  - Deploy Branch

=> _With "yarn frontend:build" will create a new build each time after changed some code before push them to Github_

That's it ! Now it's possible to browse the app URL given by heroku! 🏵 🌟

<hr />
