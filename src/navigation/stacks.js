import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import AddPhone from '../screens/AddPhone'
import EditProfile from '../screens/EditProfile'
import Profile from '../screens/Profile'
import Main from '../screens/Main'
import { connect } from 'react-redux'

const StackCompomnent = createNativeStackNavigator()

function Stacks({phone, initializing}) {
	return (
		<StackCompomnent.Navigator>
			{initializing?(
				<StackCompomnent.Screen
					options={{headerShown: false}}
					name='Splash'
					component={Splash}
				/>
			):null}
			{phone?(
				<>
					<StackCompomnent.Screen
						options={{headerShown: false}}
						name='Main'
						component={Main}
					/>
					<StackCompomnent.Screen
						options={{headerTitle: 'Edit Profile'}}
						name='EditProfile'
						component={EditProfile}
					/>
					<StackCompomnent.Screen
						options={{headerTitle: 'Profile'}}
						name='Profile'
						component={Profile}
					/>
				</>
			):(
				<>
					<StackCompomnent.Screen
						options={{headerTitle: 'Connect Phone Number'}}
						name='AddPhone'
						component={AddPhone}
					/>
				</>
			)}

		</StackCompomnent.Navigator>
	)
}

const mapStateToProps = ({user: {phone, initializing: userInitializing}, ui: {initializing: uiInitializing}}) => ({phone, initializing: uiInitializing || userInitializing})
export default connect(mapStateToProps)(Stacks)
