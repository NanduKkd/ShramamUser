import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function MainHeader({navigation}) {
	return (
		<View style={styles.Outer}>
			<Text style={styles.Title}>Shramam</Text>
			<TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Profile')}>
				<Image style={styles.Icon} source={require('../assets/settings.png')} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	Outer: {
		flexDirection: 'row',
		height: 60,
		backgroundColor: '#fff',
		borderBottomWidth: 0.5,
		borderColor: '#ddd'
	},
	Title: {
		color: '#000',
		flex: 1,
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginHorizontal: 15,
	},
	Button: {
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	Icon: {
		height: 40,
		width: 40,
	},
})
