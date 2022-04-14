import { actionTypes } from "../constants";

const initialState = {
	phone: null,
	details: null,
	loading: true,
	initializing: true,
}

export default (state=initialState, action) => {
	switch(action.type) {
		case actionTypes.USER_END_INITIALIZING:
			return {...state, initializing: false};

		case actionTypes.USER_START_LOADING:
			return {...state, loading: true};

		case actionTypes.USER_STOP_LOADING:
			return {...state, loading: false};

		case actionTypes.USER_LOGIN:
			return {phone: action.phone, details: action.details, loading: false};
		
		case actionTypes.USER_LOGOUT:
			return {phone: null, details: null, loading: false, initializing: false};

		case actionTypes.USER_DETAILS:
			return {...state, loading: false, details: {...state.details, ...action.details}};

		case actionTypes.USER_OTP_SENT:
			return {...state, loading: false, otpConfirmation: action.otpConfirmation, phoneForConfirmation: action.phoneForConfirmation};
			
		case actionTypes.CANCEL_OTP_VERIFICATION:
			return {loading: false, phone: state.phone, details: state.details};
			
		default:
			return state;
	}
}
