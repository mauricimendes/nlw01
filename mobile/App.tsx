import React, { useState } from 'react'
import { StatusBar, Switch, View, StyleSheet, Text } from 'react-native'
import { AppLoading } from 'expo'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import { ThemeProvider } from 'styled-components/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes'
import light from './src/styles/themes/light'
import dark from './src/styles/themes/dark'

const Drawer = createDrawerNavigator()

const ToogleTheme = () => {
	return (
		<Switch
		/>
	)
}

export default function App() {

	const [theme, setTheme] = useState(light)
	const [check, setCheck] = useState(false)

	const handleToggleTheme = async () => {
		setTheme(theme.theme === 'light' ? dark : light)
		setCheck(check === false ? true : false)
	}

	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Ubuntu_700Bold
	})
	
	if(!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar 
				barStyle={theme.theme === "dark" ? "default" : "dark-content"} 
				backgroundColor="transparent" 
				translucent 
			/>
			<NavigationContainer>
				<Drawer.Navigator 
					drawerStyle={{ backgroundColor: theme.theme === 'dark' ? '#1e1e21' : 'white' }} 
					initialRouteName="Home" 
					drawerContent={props => {
						return (
							<DrawerContentScrollView {...props}>
								<View style={styles.switchTheme}>
									<DrawerItem labelStyle={{ color: theme.theme === 'dark' ? '#FFF' : '#6e6e6e' }} label="Modo escuro" onPress={() => {}} />
									<Switch 
										onTouchStart={handleToggleTheme} 
										trackColor={{ false: '#c9c9c9', true: '#111112' }}
										thumbColor={theme.theme === 'dark' ? '#FFF' : '#FFF'}
										value={check}
									/>
								</View>
								<View>
									<Text 
										style={{ 
											marginTop: 10,
											marginLeft: 16, 
											color: theme.theme === 'dark' 
														? '#FFF' 
														: '#6e6e6e' 
										}}
									>
										Objetivo do Ecoleta:  
									</Text>	
									<Text
										style={{ 
											padding: 16, 
											color: theme.theme === 'dark' 
														? '#FFF' 
														: '#6e6e6e',
											marginLeft: 16
										}}
									>
										O Ecoleta tem como objeto conectar as comunidades, locais ou não,
										em busca de um único objetivo, tornar o mundo um lugar melhor.
									</Text>
								</View>
								<View>
									<Text 
										style={{ 
											marginTop: 10,
											marginLeft: 16, 
											color: theme.theme === 'dark' 
														? '#FFF' 
														: '#6e6e6e' 
										}}
									>
										Agradecimentos:  
									</Text>	
									<Text
										style={{ 
											padding: 16, 
											color: theme.theme === 'dark' 
														? '#FFF' 
														: '#6e6e6e',
											marginLeft: 16
										}}
									>
										O Ecoleta, só foi possível, graças a todo o empenho e ensinamentos da Rocket,
										graças a ela, e todos os colaboradores, conseguimos em uma semana, construir essa aplicação.
										Hoje depois de acompanhar toso os conteúdos da Rocket, posso dizer com toda a certeza, sou
										não só um profissional melhor, mas também uma pessoa melhor, mais realizado e agora, mais 
										sonhador, graças a todas as possibilidades de códigos, e ideais que que surgiram depois desses meses
										fazendo parte da comunidade da Rocket.
									</Text>
								</View>
							</DrawerContentScrollView>
						)
					}}
				>
					<Drawer.Screen name='Home' component={Routes} />
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
  	)
}

const styles = StyleSheet.create({
	switchTheme: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 10
	},
})