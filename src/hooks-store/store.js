import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldLisen = true) => {
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
			if (shouldLisen) {
				listeners.push(setState);
			}
			return () => {
				//unmount
				if (shouldLisen) {
					listeners = listeners.filter(li => li !== setState);
				}
			};
		},
		[ setState, shouldLisen ]
	);

	return [ globalState, dispatch ];
};

export const initStore = (userActions, initalState) => {
	if (initalState) {
		globalState = { ...globalState, ...initalState };
	}
	actions = { ...actions, ...userActions };
};
