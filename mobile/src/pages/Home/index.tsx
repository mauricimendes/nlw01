import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, ImageBackground, Text, View, Image, KeyboardAvoidingView, Platform, Picker, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Container, Title, Description } from './style'
import { ThemeContext } from 'styled-components'
import axios from 'axios'

interface IBGEUFResponse {
	sigla: string
}

interface IBGECityResponse {
	nome: string
}

const Home = () => {
	const navigation = useNavigation()

	const { theme } = useContext(ThemeContext)

	const [uf, setUf] = useState('0')
	const [city, setCity] = useState('0')
	const [contextTheme, setContextTheme] = useState('')
	const [ufs, setUfs] = useState<string[]>([])
	const [cities, setCities] = useState<string[]>([])

	useEffect(() => {
		function alterContextTheme() {
			setContextTheme(theme)
		}
		alterContextTheme()
	}, [])

	useEffect(() => {
		axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
			const ufInitials = response.data.map(uf => uf.sigla)
			setUfs(ufInitials)
		})
	}, [])

	useEffect(() => {
		if (uf === '0') return
		axios
			.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
			.then(response => {
				const cityNames = response.data.map(city => city.nome)
				setCities(cityNames)
			})
	}, [uf])

	function handleNavigateToPoints() {
		if(uf === '0' || city === '0') {
			Alert.alert('Selecione cidade e estado para prosseguir.')
			return
		}
		navigation.navigate('Points', {
			uf,
			city
		})
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
			<Container>
				<ImageBackground
					source={
						theme === 'dark'
							?
							require('../../assets/home-background-dark.png')
							:
							require('../../assets/home-background.png')
					}
					style={styles.container}
					imageStyle={{ width: 274, height: 368 }}
				>
					<View style={styles.main}>
						<Image
							source={
								theme === 'dark'
									?
									require('../../assets/logo-dark.png')
									:
									require('../../assets/logo.png')
							}
						/>
						<View>
							<Title style={styles.title}>Seu marketplace de coleta de resíduos</Title>
						</View>
						<View>
							<Description style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Description>
						</View>
					</View>
					<View style={styles.footer}>
						<View style={styles.selectContainer}>
							<Picker
								style={styles.selectInput}
								selectedValue={uf}
								onValueChange={(value) => setUf(value)}
							>
								<Picker.Item label="Selecione um estado" value="0" />
								{ufs.map(uf => (
									<Picker.Item key={uf} label={uf} value={uf} />
								))}
							</Picker>
						</View>
						<View style={styles.selectContainer}>
							<Picker
								style={styles.selectInput}
								selectedValue={city}
								onValueChange={(value) => setCity(value)}
							>
								<Picker.Item label="Selecione uma cidade" value="0" />
								{cities.map(city => (
									<Picker.Item key={city} label={city} value={city} />
								))}
							</Picker>
						</View>
						<RectButton style={styles.button} onPress={handleNavigateToPoints}>
							<View style={styles.buttonIcon}>
								<Icon name="arrow-right" color="#FFF" size={24} />
							</View>
							<Text style={styles.buttonText}>
								Entrar
							</Text>
						</RectButton>
					</View>
				</ImageBackground>
			</Container>
		</KeyboardAvoidingView>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
	},

	main: {
		flex: 1,
		justifyContent: 'center',
	},

	title: {
		fontFamily: 'Ubuntu_700Bold',
	},

	description: {
		fontFamily: 'Roboto_400Regular',
	},

	selectContainer: {
		marginTop: 8,
		height: 60, 
		borderRadius: 10, 
		backgroundColor: '#FFF', 
		paddingHorizontal: 5, 
		overflow: 'hidden'
	},

  	selectInput: {
		color: '#636363',
		backgroundColor: '#FFF',
		marginTop: 8,
		marginBottom: 8,

	},

	footer: {},

	select: {},

	button: {
		backgroundColor: '#34CB79',
		height: 60,
		flexDirection: 'row',
		borderRadius: 10,
		overflow: 'hidden',
		alignItems: 'center',
		marginTop: 8,
	},

	buttonIcon: {
		height: 60,
		width: 60,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},

	buttonText: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		color: '#FFF',
		fontFamily: 'Roboto_500Medium',
		fontSize: 16,
	},
});