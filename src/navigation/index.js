import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Stacks from './stacks'
import {navRef} from './ref';

export default function Navigation() {
	return (
		<NavigationContainer ref={navRef}>
			<Stacks />
		</NavigationContainer>
	)
}

export {navRef};