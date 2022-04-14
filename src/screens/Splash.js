import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { userActions, uiActions } from '../redux/actions'

function Splash({navigation, initializing, phone, initializeUser, endUiInit}) {
	useEffect(() => {
		initializeUser();
		setTimeout(() => endUiInit(), 1500)
	}, [])
	return (
		<View style={styles.Outer}>
			<View style={styles.Loading}>
				{initializing && <ActivityIndicator color="#aaa" size="large" />}
			</View>
			<Image style={styles.Logo} source={require('../assets/icon.png')} />
		</View>
	)
}
const mapStateToProps = ({user:{loading, phone}}) => ({loading, phone})
export default connect(mapStateToProps, {...userActions, ...uiActions})(Splash)

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	Logo: {
		width: '100%',
		height: undefined,
		aspectRatio: 1,
		resizeMode: 'contain'
	},
	Loading: {
		flex: 1,
		justifyContent: 'center',
	}
})
