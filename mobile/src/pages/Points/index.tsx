import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { Container, Title, ContainerItems, Item } from './style'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import api from '../../serveces/api'

interface Item {
	id:  number
	title: string
	image_url: string
}

interface Point {
	id: number
	name: string
	image: string
	image_url: string
	latitude: number
	longitude: number
}

interface RouteParams {
	uf: string
	city: string
}

const Points = () => {

	const [items, setItems] = useState<Item[]>([])
	const [selectedItems, setSelectedItems] = useState<number[]>([])
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0 ,0])
	const [points, setPoints] = useState<Point[]>([])
	const navigation = useNavigation()
	const route = useRoute()
	const routeParams = route.params as RouteParams
	
	useEffect(() => {
		api.get('items').then(response => {
			setItems(response.data)
		})
	}, [])

	useEffect(() => {
		async function loadPosition() {
			const { status } = await Location.requestPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização')
				return
			}

			const location = await Location.getCurrentPositionAsync()

			const { latitude, longitude } = location.coords

			setInitialPosition([
				latitude,
				longitude
			])
		}
		loadPosition()
	}, [])

	useEffect(() => {
		api.get('points', {
			params: {
				city: routeParams.city,
				uf: routeParams.uf,
				items: selectedItems
			}
		}).then(response => {
			setPoints(response.data)
		})
	}, [selectedItems])

	function handleNavigateBack() {
		navigation.goBack()
	}

	function handleNavigateToDetail(id: number) {
		navigation.navigate('Detail', { point_id: id })
	}

	function handleSelectItem(id: number) {
		const alreadySelected = selectedItems.findIndex(item => item === id)

		if(alreadySelected >= 0) {
			const filteredItems = selectedItems.filter(item => item !== id)
			setSelectedItems(filteredItems)
		}
		else {
			setSelectedItems([ ...selectedItems, id ])
		}
	}

    return (
		<>
			<Container >
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name="arrow-left" size={20} color="#34cb79" />
				</TouchableOpacity>
				<Title style={styles.title}>Bem vindo.</Title>
				<Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
				<View style={styles.mapContainer}>
					{ initialPosition[0] !== 0 && (
						<MapView 
							style={styles.map}
							initialRegion={{
								latitude: initialPosition[0],
								longitude: initialPosition[1],
								latitudeDelta: 0.030,
								longitudeDelta: 0.030
							}}
						>
							{points.map(point => (
								<Marker 
									key={String(point.id)}
									style={styles.mapMarker}
									onPress={() => handleNavigateToDetail(point.id)}
									coordinate={{
										latitude: point.latitude,
										longitude: point.longitude
									}}
								>
									<View style={styles.mapMarkerContainer}>
										<Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />
										<Text style={styles.mapMarkerTitle}>{point.name}</Text>
									</View>
								</Marker>
							))}
						</MapView>
					)}
				</View>
			</Container>
			<ContainerItems>
				<ScrollView
					horizontal 
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20 }}
				>
					{items.map(item => (
						<Item 
							key={String(item.id)} 
							style={[
								selectedItems.includes(item.id) ? styles.selectedItem : {},
							]} 
							onPress={() => handleSelectItem(item.id)}
							activeOpacity={0.6}
						>
							<SvgUri width={42} height={42} uri={item.image_url}/>	
							<Text style={styles.itemTitle}>{item.title}</Text>
						</Item>
					))}
				</ScrollView>
			</ContainerItems>
		</>
	)
}

export default Points

const styles = StyleSheet.create({

  title: {
    fontFamily: 'Ubuntu_700Bold',
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
	lineHeight: 23,
	alignItems: 'center',
	justifyContent: 'center',
	marginLeft: 7
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});