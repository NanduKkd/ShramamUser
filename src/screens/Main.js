import React from 'react'
import { View, Button } from 'react-native'

export default function Main({navigation}) {
	return (
		<View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
			<Button title="Profile" onPress={() => navigation.navigate('Profile')} />
		</View>
	)
}