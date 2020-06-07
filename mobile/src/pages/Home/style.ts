import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.containerBackgroundColor};
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.colorTitle};
    font-size: 24px;
    max-width: 260px;
    margin-top: 32px;
`

export const Description = styled.Text`
    color: ${props => props.theme.colors.description};
    font-size: 16px;
    margin-top: 16px;
    max-width: 260px;
`

export const Input = styled.TextInput`
    height: 60px;
    background-color: ${props => props.theme.colors.colorInput};
    border-radius: 10px;
    margin-bottom: 8px;
    padding-horizontal: 24px;
    font-size: 16px;
`