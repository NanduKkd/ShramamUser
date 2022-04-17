import { actionTypes } from '../constants';

const initialState = {
	datesArr: [],
	dates: {},
	loading: false,
}

export default function dates(state=initialState, action) {
	let dates;
	switch(action.type) {
		case actionTypes.DATES_START_LOADING:
			return {...state, loading: true};

		case actionTypes.DATES_STOP_LOADING:
			return {...state, loading: false};

		case actionTypes.DATES_DATA:
			return {...state, datesArr: action.datesArr, dates: action.dates, loading: false};

		case actionTypes.DATES_CHANGE:
			dates = {...state.dates};
			if(!action.newState) delete dates[action.date];
			else dates[action.date] = action.newState;
			return {...state, dates}

		default:
			return state;
	}
}
