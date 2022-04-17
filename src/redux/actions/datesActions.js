import { actionTypes } from '../constants';
import { firestore } from '../../utils/firebase'

function loadDates () {
	return async (dispatch, getState) => {
		dispatch({type: actionTypes.DATES_START_LOADING});
		const docs = await firestore.collection('days').where('user','==',getState().user.phone).get();
		const dates = {};
		docs.forEach(doc => dates[doc.id] = doc.get('status'));
		dispatch({type: actionTypes.DATES_DATA, dates})
	}
}

function changeDateStatus (date, newState) {
	return async (dispatch, getState) => {
		dispatch({type: actionTypes.DATES_START_LOADING});
		dispatch({type: actionTypes.DATES_CHANGE, date, newState})
		try {
			if(!newState) {
				await firestore.collection('days').doc(date).delete();
			} else {
				await firestore.collection('days').doc(date).set({user: getState().user.phone, status: '-'})
			}
		} catch (e) {
			dispatch({type: actionTypes.DATES_CHANGE, date, newState: !newState});
			console.warn(e);
		} finally {
			dispatch({type: actionTypes.DATES_STOP_LOADING});
		}
	}
}

export const datesActions = {
	loadDates,
	changeDateStatus,
}
