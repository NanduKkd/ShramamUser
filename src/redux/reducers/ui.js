import {actionTypes} from '../constants'

const initialState = {
	initializing: true
}

export default function ui(state=initialState, action) {
	switch(action.type) {
		case actionTypes.UI_END_INITIALIZATION:
			return {...state, initializing: false};
		default:
			return state;
	}
}
