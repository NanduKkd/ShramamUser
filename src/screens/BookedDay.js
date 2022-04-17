import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'

export default function BookedDay() {
	return (
		<ScrollView style={styles.Scroll}>
			<View style={styles.Outer}></View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	Scroll: {
		backgroundColor: '#fff',
	},
	Outer: {
		padding: 15,
	}
})
