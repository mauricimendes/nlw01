# nlw01
Projeto feito durante a semana Next Level Week #01

# Para a construção do projeto, usamos a stack NodeJS, ReactJS e React Native (expo), com o template @type-script


Necessário ter no seu celular o app Expo instalado para rodar o app mobile
---------

# Tecnologias/libs usadas para construção do Backend:


**Dependências**
- @types/cors

- celebrate

- cors

- express

- knex

- multer

- sqlite3

**Dependências de desenvolvimento**
- @types/express

- @types/hapi__joi

- @types/multer

- ts-node

- ts-node-dev

- typescript

Para rodar a aplicação na sua máquina:
-----------

**Instale as dependências**
> npm install

**Rode as migrations**
> npm run knex:migrate

**Rode as Seeds**
> npm run knex:seed

**Rode o backend**
> npm run dev

Para testar as rotas, com o Insomnia ou Postman...
-------------
**Rota para criação de um ponto de coleta**
> POST -- http://localhost:3333/points

**Para esta rota você deve mandar em Multipart Form com a seguinte estrutura:**
- name:  NOME DE TESTE
- email:  email@email.com.br (use o seu email)
- whatsapp: 999999999 (use o número)
- latitude: -89.489798 (use a latitude do google maps para sua cidade se quiser)
- longitude: -84.465496 (use a longitude do google maps para sua cidade se quiser)
- city: Garuva (por exemplo)
- uf: SC
- items: 1,2,6 (números de 1 a 6)
- image: image.jpg (selecione um arquivo de sua preferência)

**Listar Itens**
> GET -- http://localhost:3333/items

**Listar Pontos Específicos**
> GET -- http://localhost:3333/points/ID_POINT

**Listar Pontos Filtrados**
> GET -- http://localhost:3333/points

**Para esta rota você deve uma query com a seguinte estrutura:**
- city: Garuva
- uf: SC
- items: 6

# Tecnologias/libs usadas para construção do Front WEB:

**Dependências**
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/jest
- @types/node
- @types/react
- @types/react-dom    
- @types/styled-components    
- axios
- leaflet
- react    
- react-dom
- react-dropzone
- react-icons
- react-leaflet
- react-router-dom
- react-scripts
- react-switch
- styled-components
- typescript 

**Dependências de desenvolvimento**
- @types/react-leaflet
- @types/react-router-dom

Para rodar o frontend na sua máquina
------------

**Instale as dependências**
> npm install

**Rode a aplicação (certifique-se que o backend esteja rodando)**
> npm start


Tecnologias/libs usadas para construção do Mobile:
---------

# Tenha o Expo instalado na máquina

# Tecnologias/libs usadas para construção do Front WEB:


**Dependências**
- @expo-google-fonts/roboto
- @expo-google-fonts/ubuntu
- @react-native-community/masked-view 
- @react-navigation/drawer
- @react-navigation/native
- @react-navigation/stack
- axios
- expo
- expo-constants
- expo-font
- expo-location
- expo-mail-composer
- react
- react-dom
- react-native
- react-native-appearance
- react-native-gesture-handler
- react-native-maps 
- react-native-picker-select
- react-native-reanimated
- react-native-safe-area-context 
- react-native-screens
- react-native-svg react-native-web
- styled-components

**Dependências de desenvolvimento**
- @babel/core
- @types/react
- @types/react-native
- @types/styled-components
- babel-preset-expo
- typescript

Para rodar o expo na sua máquina e acessar com o seu celular ou simuladores 
---------

**Instale as dependências**
> npm install

**Rode o expo**
> expo start

**Importante**
> Esse camando irá abrir uma janela no seu navegador, que terá um IP de lan, é necessário pegar esse ip e adicionalo no arquivo src/serveces/api.tsx 


