import {actionTypes} from '../constants';

function endUiInit() {
	return dispatch => dispatch({type: actionTypes.UI_END_INITIALIZATION});
}

export const uiActions = {
	endUiInit,
}
