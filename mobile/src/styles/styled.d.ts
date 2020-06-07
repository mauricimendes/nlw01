import 'styled-components'
declare module 'styled-components' {
    export interface DefaultTheme {
        theme: string,

        colors: {
            containerBackgroundColor: string,
            colorTitle: string,
            description: string,
            itemBackground: string,
            itemBorderColor: sting
        }
    }
}