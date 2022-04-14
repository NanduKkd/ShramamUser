import React from 'react'
import { ScrollView, Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { userActions } from '../redux/actions'

function Profile({loading, phone, logout, navigation, details}) {
	return (
		<ScrollView style={styles.Scroll}>
			{phone?(
				<View style={styles.Outer}>
					{loading && <View style={styles.Loader}><ActivityIndicator size="large" color="#7cf" /></View>}
					<View style={styles.Field}>
						<Text style={styles.FieldLabel}>Name</Text>
						<Text style={styles.FieldValue}>{details?.name || "-"}</Text>
					</View>
					<View style={styles.Field}>
						<Text style={styles.FieldLabel}>Nickname</Text>
						<Text style={styles.FieldValue}>{details?.nickname || "-"}</Text>
					</View>
					<View style={styles.Field}>
						<Text style={styles.FieldLabel}>Phone</Text>
						<Text style={styles.FieldValue}>{phone.substring(0,3) + "  " + phone.substring(3,8) + "  " + phone.substring(8,13)}</Text>
					</View>
					<View style={styles.Field}>
						<Text style={styles.FieldLabel}>Date of Birth</Text>
						<Text style={styles.FieldValue}>{details?.dateOfBirth || "-"}</Text>
					</View>
					<View style={styles.Gap} />
					<Button disabled={loading} title='Edit Profile' onPress={() => navigation.navigate("EditProfile")} />
					<View style={styles.Gap} />
					<Button disabled={loading} title='Logout' color="#f00" onPress={logout} />
				</View>
			):(
				<View style={[styles.Outer, {paddingVertical: 100}]}>
					{loading && <View style={styles.Loader}><ActivityIndicator size="large" color="#7cf" /></View>}
					<Button disabled={loading} title="Connect your Phone" color="#0a0" onPress={() => navigation.navigate('AddPhone')} />
				</View>
			)}
		</ScrollView>
	)
}

export default connect(({user}) => user, userActions)(Profile)

const styles = StyleSheet.create({
	Scroll: {
		backgroundColor: '#fff',
	},
	Outer: {
		padding: 30,
	},
	Loader: {
		padding: 10,
	},
	Field: {
		paddingVertical: 10,
	},
	FieldLabel: {
		color: '#aaa',
		fontSize: 14,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	FieldValue: {
		fontSize: 18,
		color: '#000',
	},
	Gap: {
		height: 10,
		width: 10,
	},
})