import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView, Linking, Alert } from 'react-native'
import Constants from 'expo-constants'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute} from '@react-navigation/native'
import { Container, Title, PointItems, AdressTitle, AdressContent, Footer } from './style'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../serveces/api'
import * as MailComposer from 'expo-mail-composer'

interface RouteParams {
	point_id: number
}

interface Data {
	point: {
		image: string
		image_url: string
		name: string
		email: string
		whatsapp: string
		city: string
		uf: string
	}
	items: {
		title: string
	}[]
}

const Detail = () => {

	const navigation = useNavigation()
	const route = useRoute()
	const routeParams = route.params as RouteParams
	const [data, setData] = useState<Data>({} as Data)

	useEffect(() => {
		api.get(`points/${routeParams.point_id}`).then(response => {
			setData(response.data)
		})
	}, [])

	function handleNavigateBack() {
		navigation.goBack()
	}

	function handleComposeMail() {
		MailComposer.composeAsync({
			subject: 'Interesse na coleta de resíduos',
			recipients: [data.point.email]
		})
	}

	function handleWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre a coleta de resíduos`)
	}

	if (!data.point) {
		return null
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name="arrow-left" size={20} color="#34cb79" />
				</TouchableOpacity>
				<Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
				<Title style={styles.pointName}>{data.point.name}</Title>
				<PointItems>
					{data.items.map(item => item.title).join(', ')}
				</PointItems>
				<View style={styles.address}>
					<AdressTitle style={styles.addressTitle}>Endereço</AdressTitle>
					<AdressContent style={styles.addressContent}>{data.point.city}, {data.point.uf}</AdressContent>
				</View>
			</Container>
			<Footer style={styles.footer}>
				<RectButton style={styles.button} onPress={handleWhatsapp}>
					<FontAwesome name="whatsapp" size={20} color="#FFF" />
					<Text style={styles.buttonText}>Whatsapp</Text>
				</RectButton>
				<RectButton style={styles.button} onPress={handleComposeMail}>
					<Icon name="mail" size={20} color="#FFF" />
					<Text style={styles.buttonText}>E-mail</Text>
				</RectButton>
			</Footer>
		</SafeAreaView>
	)
}

export default Detail

const styles = StyleSheet.create({

	pointImage: {
		width: '100%',
		height: 120,
		resizeMode: 'cover',
		borderRadius: 10,
		marginTop: 32
	},

	pointName: {
		fontFamily: 'Ubuntu_700Bold'
	},

	pointItems: {
		fontFamily: 'Roboto_400Regular'
	},

	address: {
		marginTop: 32,
	},

	addressTitle: {
		fontFamily: 'Roboto_500Medium'
	},

	addressContent: {
		fontFamily: 'Roboto_400Regular'
	},

	footer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		paddingVertical: 20,
		paddingHorizontal: 32,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	button: {
		width: '48%',
		backgroundColor: '#34CB79',
		borderRadius: 10,
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		marginLeft: 8,
		color: '#FFF',
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
	},
});