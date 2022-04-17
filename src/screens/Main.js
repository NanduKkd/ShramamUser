import React, { useState, useEffect } from 'react'
import { ScrollView, View, TouchableWithoutFeedback, Switch, Button, TextInput, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import Calender from '../components/Calender'
import { monthNames } from '../utils/calender'
import { connect } from 'react-redux'
import { datesActions } from '../redux/actions'

function Main({navigation, loadDates, changeDateStatus, dates, loading}) {
	const [modalDate, setModalDate] = useState(false);
	useEffect(() => {
		loadDates();
	}, [])
	const isBusy = (j) => !dates[`${j[2]} ${j[1]} ${j[0]}`];
	const onSwitchChange = (val) => {
		changeDateStatus(`${modalDate[2]} ${modalDate[1]} ${modalDate[0]}`, val?'-':null)
	}
	return (
		<ScrollView style={styles.Scroll}>
			<View style={styles.Outer}>
				<Calender onDatePress={(date, booked) => booked?navigation.navigate("BookedDay", {date}):setModalDate(date)} />
				<Modal transparent visible={modalDate?true:false} onRequestClose={() => setModalDate(null)}>
					{modalDate?(
						<View style={styles.ModalOuter}>
							<TouchableWithoutFeedback onPress={() => setModalDate(null)}>
								<View style={styles.ModalBg}></View>
							</TouchableWithoutFeedback>
							<View style={styles.ModalInner}>
								<Text style={styles.ModalDate}>{modalDate[2]} {monthNames[modalDate[1]]} {modalDate[0]}</Text>
								<View style={styles.ModalRow}>
									<Text style={styles.ModalRowKey}>Your Status:</Text>
									{loading && <ActivityIndicator size="small" color="#ccc" />}
									<Text style={[styles.ModalRowValue, {color: isBusy(modalDate)?'#f55':'#777'}]}>{isBusy(modalDate)?'Busy':'Available'}</Text>
									<Switch value={!isBusy(modalDate)} trackColor={{true: '#bed', false: '#ddd'}} onValueChange={onSwitchChange} disabled={loading} />
								</View>
							</View>
						</View>
					):null}
				</Modal>
			</View>
		</ScrollView>
	)
}

const styles = {
	Scroll: {
		backgroundColor: '#fff',
	},
	Outer: {
		padding: 10,
	},
	ModalOuter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ModalBg: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: '#000c'
	},
	ModalInner: {
		minHeight: 50,
		minWidth: 300,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 20,
	},
	ModalDate: {
		color: '#000',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 15,
	},
	ModalRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	ModalRowKey: {
		color: '#000',
		flex: 1,
		fontSize: 16,
		marginRight: 10,
	},
	ModalRowValue: {
		fontSize: 16,
		marginLeft: 10,
	},
}

export default connect(({dates}) => (dates),datesActions)(Main);
