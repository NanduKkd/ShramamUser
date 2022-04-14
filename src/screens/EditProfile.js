import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { userActions } from '../redux/actions'

function EditProfile({user, editUserDetails}) {
	const [name, setName] = useState(user.details?.name||"")
	const [nickname, setNickname] = useState(user.details?.nickname||"")
	const [dateOfBirth, setDateOfBirth] = useState(user.details?.dateOfBirth||"")
	const changed = nickname!==(user.details?.nickname||"") || name!==(user.details?.name || "") || dateOfBirth!==(user.details?.dateOfBirth || "")
	return (
		<ScrollView style={styles.Scroll}>
			<View style={styles.Outer}>
				{user.loading && (
					<View style={styles.Loading}>
						<ActivityIndicator color="7af" size="large" />
					</View>
				)}
				<View style={styles.Field}>
					<Text style={styles.FieldLabel}>Name</Text>
					<TextInput style={styles.FieldInput} value={name} autoFocus onChangeText={setName} />
				</View>
				<View style={styles.Field}>
					<Text style={styles.FieldLabel}>Nickname</Text>
					<TextInput style={styles.FieldInput} value={nickname} autoFocus onChangeText={setNickname} />
				</View>
				<View style={styles.Field}>
					<Text style={styles.FieldLabel}>Date of Birth</Text>
					<TextInput style={styles.FieldInput} value={dateOfBirth} onChangeText={setDateOfBirth} />
				</View>
				<Button disabled={user.loading || !changed} title="Save Changes" onPress={() => editUserDetails({name, nickname, dateOfBirth})} />
			</View>
		</ScrollView>
	)
}

export default connect(({user}) => ({user}),userActions)(EditProfile)

const styles = StyleSheet.create({
	Loading: {
		padding: 15,
	},
	Scroll: {
		backgroundColor: '#fff',
	},
	Outer: {
		padding: 20,
	},
	Field: {
		paddingVertical: 20,
	},
	FieldLabel: {
		color: '#aaa',
		fontWeight: 'bold',
		marginBottom: 5,
	},
	FieldInput: {
		color: '#000',
		fontSize: 18,
		borderBottomWidth: 2,
		borderColor: '#ccc',
		paddingVertical: 5,
		textDecorationLine: 'none',
	},
})