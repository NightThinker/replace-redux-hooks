import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
	const setState = useState(globalState)[1];

	const dispatch = (actionIdentifier, payload) => {
		console.log(actionIdentifier);
		const newState = actions[actionIdentifier](globalState, payload);
		globalState = { ...globalState, ...newState };

		for (const listener of listeners) {
			listener(globalState);
		}
	};

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

	return [ globalState, dispatch ];
};

export const initStore = (userActions, initalState) => {
	if (initalState) {
		globalState = { ...globalState, ...initalState };
	}
	actions = { ...actions, ...userActions };
};
