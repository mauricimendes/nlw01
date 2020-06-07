import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding: 32px;
    padding-top: 40px;
    background-color: ${props => props.theme.colors.containerBackgroundColor};
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.colorTitle};
    font-size: 28px;
    margin-top: 24px;
`

export const PointItems = styled.Text`
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    color: ${props => props.theme.colors.description};
`
export const AdressTitle = styled.Text`
    color: ${props => props.theme.colors.colorTitle};
    font-size: 16px;
`

export const AdressContent = styled.Text`
    line-height: 24px;
	margin-top: 8px;
	color: ${props => props.theme.colors.description};
`
export const Footer = styled.View`
    background-color: ${props => props.theme.colors.containerBackgroundColor};
    border-color: ${props => props.theme.colors.description};
`