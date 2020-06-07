import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding-top: 40px;
    padding-horizontal: 32px;
    background-color: ${props => props.theme.colors.containerBackgroundColor};
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.colorTitle};
    font-size: 20px;
    margin-top: 24px;
`

export const ContainerItems = styled.View`
    flex-direction: row;
    padding-top: 16px;
    padding-bottom: 23px;
    background-color: ${props => props.theme.colors.containerBackgroundColor};
`

export const Item = styled.TouchableOpacity`
    background-color: ${props => props.theme.colors.itemBackground};
    border-width: 2px;
    border-color: ${props => props.theme.colors.itemBorderColor};
    height: 120px;
    width: 120px;
    border-radius: 8px;
    padding-horizontal: 16px;
    padding-top: 20px;
    padding-Bottom: 16px;
    margin-right: 8px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
`

// export const Description = styled.Text`
//     color: ${props => props.theme.colors.description};
//     font-size: 16px;
//     margin-top: 16px;
//     max-width: 260px;
// `

// export const Input = styled.TextInput`
//     height: 60px;
//     background-color: ${props => props.theme.colors.colorInput};
//     border-radius: 10px;
//     margin-bottom: 8px;
//     padding-horizontal: 24px;
//     font-size: 16px;
// `