import React, { useState, useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getMonthCalenderArr, monthNames, weekShortNames, dayDifference } from '../utils/calender'
import { connect } from 'react-redux'

const now = new Date();

function Calender({onDatePress=()=>{}, loading, dates}) {
	const [month, setMonth] = useState(() => now.getMonth());
	const [year, setYear] = useState(() => now.getFullYear());
	const arr = useMemo(() => getMonthCalenderArr(month,year),[month, year])
	const decrMonth = () => {
		if(month===0) {
			setYear(y => y-1);
			setMonth(11);
		} else setMonth(m => m-1);
	}
	const incrMonth = () => {
		if(month===11) {
			setYear(y => y+1);
			setMonth(0);
		} else setMonth(m => m+1)
	}
	const isBooked = (j) => dates[`${j[2]} ${j[1]} ${j[0]}`] && dates[`${j[2]} ${j[1]} ${j[0]}`]!=='-';
	return (
		<View style={styles.Outer}>
			<View style={styles.Header}>
				<TouchableOpacity disabled={loading} onPress={decrMonth} style={styles.HeaderNavButton}>
					<Text style={styles.HeaderNavText}>{'<'}</Text>
				</TouchableOpacity>
				<Text style={styles.HeaderTitle}>{monthNames[month]} {year}</Text>
				<TouchableOpacity disabled={loading} onPress={incrMonth} style={styles.HeaderNavButton}>
					<Text style={styles.HeaderNavText}>{'>'}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.Container}>
				<View style={styles.Week}>
					{weekShortNames.map((i,ii) => (
						<Text key={ii} style={styles.DayName}>{i}</Text>
					))}
				</View>
				{arr.map((i,ii) => (
					<View key={ii} style={styles.Week}>
						{i.map((j,jj) => (
							<TouchableOpacity disabled={loading || dayDifference(new Date(...j), now)<0} onPress={() => onDatePress(j, isBooked(j))} key={jj} style={styles.DayOuter}>
								<Text style={[
									styles.Day,
									j[2]===now.getDate()&&j[1]===now.getMonth()&&j[0]===now.getFullYear()?styles.Today:{},
									dayDifference(new Date(...j), now)<0?styles.History:!dates[j[2]+' '+j[1]+' '+j[0]]?styles.BusyDay:dates[j[2]+' '+j[1]+' '+j[0]]==='-'?styles.FreeDay:styles.BookedDay,
									j[1]===month?{}:styles.BlurDay
								]}>{j[2]}</Text>
								{isBooked(j)?<Text style={styles.DayChecked}>{'✔'}</Text>:null}
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
		</View>
	)
}

const mapStateToProps = ({dates}) => dates
export default connect(mapStateToProps)(Calender)

const styles = {
	Outer: {
		width: '100%',
	},
	Header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	HeaderNavButton: {
		width: 40,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	HeaderNavText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#aaa'
	},
	HeaderTitle: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
		flex: 1,
	},
	Container: {
		borderWidth: 0.5,
		width: '100%',
		height: undefined,
	},
	Week: {
		flexDirection: 'row',
		width: '100%',
	},
	DayOuter: {
		flex: 1,
		height: undefined,
		aspectRatio: 1,
	},
	Day: {
		flex: 1,
		width: '100%',
		borderWidth: 0.5,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: '#000',
		fontWeight: 'bold',
		fontSize: 18,
	},
	BlurDay: {
		color: '#999',
		fontWeight: 'normal',
	},
	Today: {
		borderWidth: 1,
		borderColor: '#00f',
	},
	DayName: {
		flex: 1,
		height: undefined,
		aspectRatio: 1.6,
		borderWidth: 0.5,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: '#000',
		backgroundColor: '#ddd',
		fontSize: 14,
		fontWeight: 'bold',
	},
	History: {
		backgroundColor: '#aaa',
		color: '#777'
	},
	BookedDay: {
		backgroundColor: '#cfc',
		color: '#000',
	},
	BusyDay: {
		backgroundColor: '#ccc',
		color: '#000',
	},
	FreeDay: {
		backgroundColor: '#fff',
		color: '#000',
	},
	DayChecked: {
		position: 'absolute',
		top: 0,
		right: 5,
		color: '#0a0',
		fontSize: 12
	},
}
