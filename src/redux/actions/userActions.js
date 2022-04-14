import { auth, firestore } from '../../utils/firebase'
import firestoreClass from '@react-native-firebase/firestore'
import authClass from '@react-native-firebase/auth'
import { actionTypes } from '../constants'
import { LOG_ALL } from '../../utils/constants'
import { Alert, ToastAndroid } from 'react-native'
import { navRef } from '../../navigation'

const authWithPhone = async() => {
	const user = auth.currentUser;
	const userDoc = await firestore.collection('users').doc(user.phoneNumber).get()
	if(userDoc.exists) {
		return {
			type: actionTypes.USER_LOGIN,
			phone: user.phoneNumber,
			details: userDoc.data(),
		}
	} else {
		await firestore.collection('users').doc(user.phoneNumber).set({
			createdAt: firestoreClass.FieldValue.serverTimestamp(),
		})
		return {
			type: actionTypes.USER_LOGIN,
			phone: user.phoneNumber,
		};
	}
}

const handleAuthError = (e) => {
	return async dispatch => {
		let alertMsg = '';
		switch(e.code) {
			case 'auth/network-request-failed':
				dispatch({type: actionTypes.USER_STOP_LOADING})
				alertMsg = 'Network connection failed. Please Try again.';
				break;
			case 'auth/too-many-requests':
				dispatch({type: actionTypes.CANCEL_OTP_VERIFICATION});
				// navRef.pop();
				alertMsg = 'Too many requests from your phone recently. Please try again after some time.'
				break;
			case 'auth/invalid-verification-code':
				dispatch({type: actionTypes.USER_STOP_LOADING})
				alertMsg = 'The entered verification code is invalid. Try again.';
				break;
			default:
				dispatch({type: actionTypes.USER_STOP_LOADING})
				alertMsg = 'Some error ocurred. Please try again after some time.';
				console.log(e.namespace, e.code, e.name, e.message);
				break;
		}
		console.log('alerting', alertMsg)
		Alert.alert("Verification error", alertMsg, [{text: 'OK'}]);
		console.log('alerted');
		console.warn(e);
	}
}






const initializeUser = () => {
	return async dispatch => {
		dispatch({type: actionTypes.USER_START_LOADING});
		auth.onAuthStateChanged(async(user) => {
			if(LOG_ALL) console.log('auth state changed:', user?'login':'logout', user?.isAnonymous?'anony':'not_anony', user?.phoneNumber || 'unknown_phone')
			dispatch({type: actionTypes.USER_END_INITIALIZATION})
			if(user && !user.isAnonymous) {
				const dispatchData = await authWithPhone();
				dispatch(dispatchData);
			} else {
				dispatch({type: actionTypes.USER_LOGOUT});
			}
		})
	}
}

const connectPhone = (phone, forceResend) => {
	return async dispatch => {
		dispatch({type: actionTypes.USER_START_LOADING});
		const verifying = auth.verifyPhoneNumber(phone, forceResend?true:false)
		verifying.on('state_changed', snap => {
			switch(snap.state) {
				case authClass.PhoneAuthState.CODE_SENT:
					ToastAndroid.show('Code sent successfully.', ToastAndroid.SHORT);
					dispatch({type: actionTypes.USER_OTP_SENT, otpConfirmation: snap.verificationId, phoneForConfirmation: phone})
					break;
				case authClass.PhoneAuthState.AUTO_VERIFIED:
					dispatch(confirmOtp(snap.code, snap.verificationId, phone));
					break;
			}
		}).catch(e => dispatch(handleAuthError(e)))
	}
}

const cancelConnectPhone = () => {
	return async (dispatch) => {
		dispatch({type: actionTypes.CANCEL_OTP_VERIFICATION});
	}
}

const confirmOtp = (code, verificationId, phone) => {
	return async (dispatch, getState) => {
		dispatch({type: actionTypes.USER_START_LOADING});
		const cred = authClass.PhoneAuthProvider.credential(verificationId || getState().user.otpConfirmation, code);
		try {
			await auth.signInWithCredential(cred)
		} catch (e) {
			console.log('err2_________')
			dispatch(handleAuthError(e));
			return;
		}
	}
}

const editUserDetails = ({name, nickname, dateOfBirth}) => {
	return async (dispatch, getState) => {
		dispatch({type: actionTypes.USER_START_LOADING});
		const userDetails = {};
		if(name) userDetails.name = name;
		if(nickname) userDetails.nickname = nickname;
		if(dateOfBirth) userDetails.dateOfBirth = dateOfBirth;
		await firestore.collection('users').doc(getState().user.phone).update(userDetails);
		dispatch({type: actionTypes.USER_DETAILS, details: userDetails});
	}
}

const logout = () => {
	return async (dispatch/*, getState*/) => {
		dispatch({type: actionTypes.USER_START_LOADING});
		// const auth_id = getState().user.auth_id;
		await auth.signOut();
		// await firestore
		// 	.collection('auths')
		// 	.doc(auth_id)
		// 	.update({loggedOutAt: firestoreClass.FieldValue.serverTimestamp()});
	}
}

export const userActions = {
	initializeUser,
	editUserDetails,
	connectPhone,
	cancelConnectPhone,
	confirmOtp,
	logout,
}
