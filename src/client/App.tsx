import React, { useState, useEffect } from 'react';

interface AppProps {}

const App = (props: AppProps) => {
	const [data, setData] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/api/hello')
			.then(res => res.json())
			.then(data => setData(data.message))
			.catch(e => console.log('[fetch erorr]', e));
	}, []);

	return (
		<div className="container">
			<div className="text-green-700 bg-green-100 border border-green-900">Hello {data}</div>
		</div>
	);
};

export default App;
