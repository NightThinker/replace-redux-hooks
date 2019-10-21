import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let action = {};

const useStore = () => {
	const [ state, setState ] = useState(globalState);
	useEffect(
		() => {
			listeners.push(setState);
			return () => {
				//unmount
				listeners = listeners.filter(li => li !== setState);
			};
		},
		[ setState ]
	);
};
