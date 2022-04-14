import React, { useReducer, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { userActions } from '../redux/actions'

const phoneReducer = (val, newVal) => ([newVal, /^[6-9]\d{9}$/.test(newVal)])
const otpReducer = (val, newVal) => ([newVal, /^\d{6}$/.test(newVal)])

function AddPhone({loading, phoneForConfirmation, connectPhone, cancelConnectPhone, confirmOtp}) {
	const [[phone, verified], onChange] = useReducer(phoneReducer, ['', false])
	const sendOtp = () => {
		connectPhone('+91'+phone)
	}
	const [[otp, otpVerified], onOtpChange] = useReducer(otpReducer, ['', false])
	const verifyOtp = () => {
		confirmOtp(otp);
	}
	return phoneForConfirmation?(
		<View style={styles.Outer}>
			<Text style={styles.Label}>Enter the Verification Code sent to ******{phoneForConfirmation.substr(9,4)}:</Text>
			<View style={styles.InputRow}>
				<TextInput editable={!loading} style={[styles.Input, {borderColor: otpVerified?'#0a0':'#f00'}]} keyboardType="phone-pad" onChangeText={onOtpChange} value={otp} />
				<Text style={[styles.InputVerify, {color: otpVerified?'#0a0':'#f00'}]}>{otpVerified?'✔':'✘'}</Text>
			</View>
			<Button disabled={loading} title="Change phone number" onPress={cancelConnectPhone} />
			<Button disabled={loading} title="Resend Code" onPress={() => connectPhone(phoneForConfirmation, true)} />
			<Button disabled={!otpVerified || loading} title="Verify Code" onPress={verifyOtp} />
		</View>
	):(
		<View style={styles.Outer}>
			<Text style={styles.Label}>Enter your phone number:</Text>
			<View style={styles.InputRow}>
				<TextInput style={[styles.Input, styles.DisabledInput]} editable={false} value="+91" />
				<TextInput autoFocus editable={!loading} style={[styles.Input, {borderColor: verified?'#0a0':'#f00'}]} keyboardType="phone-pad" onChangeText={onChange} value={phone} />
				<Text style={[styles.InputVerify, {color: verified?'#0a0':'#f00'}]}>{verified?'✔':'✘'}</Text>
			</View>
			<Button disabled={!verified || loading} title="Send Verification Code" onPress={sendOtp} />
		</View>
	)
}

const mapStateToProps = ({user: {loading, phoneForConfirmation}}) => ({loading, phoneForConfirmation})
export default connect(mapStateToProps, userActions)(AddPhone)

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		padding: 15,
	},
	Label: {
		color: '#000',
	},
	Input: {
		borderBottomWidth: 1,
		borderColor: '#000',
		paddingVertical: 5,
		fontSize: 27,
		flex: 1,
		color: '#000',
	},
	DisabledInput: {
		color: '#777',
		paddingRight: 5,
		flex: 0,
		borderBottomWidth: 0,
	},
	InputVerify: {
		fontSize: 25,
		width: undefined,
		aspectRatio: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	InputRow: {
		flexDirection: 'row',
		// alignItems: 'center',
		marginBottom: 10,
	},
})

