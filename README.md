
# INSTALL NVM and Node

- Install Setups Programs (Node and NVM)
- nvm --version
- nvm install latest (npm v10.2.0, node.js 21.1.0) or npm install -g npm@latest

# Login to github.com/

- $ git config --global user.name "John Doe"
- $ git config --global user.email <johndoe@example.com>

# Creating Project app

- npx create-payload-app
- mongodb://127.0.0.1/db_lcs
- Run npm install -g npm@10.2.1 to update!

# add assets directory to server.ts

- app.use('/assets', express.static(path.resolve(__dirname, './assets')));

# Modules

## VENTAS

- Clients *
- npm i @payloadcms/plugin-nested-docs
- Orders
- Reviews
- Quotes

## CONTENIDO

- Images *
- npm install @payloadcms/richtext-lexical
- Tags *
- Publications *
- Portraits*

## INVENTARIO

- Products *
- Services *
- Subcategories *
- Categories *

## SISTEMA

- Users *
- Empresa *
- payload-preferences

# REST API QUERY

## AUTHENTICATION

### URLS

Login           POST: <http://localhost:3000/api/usuarios/login> *
Logout          POST: <http://localhost:3000/api/usuarios/logout> *
Unlock          POST: <http://localhost:3000/api/usuarios/unlock>
Refresh         POST: <http://localhost:3000/api/usuarios/refresh-token> *
Verify user     POST: <http://localhost:3000/api/usuarios/verify/{token}>
Current user    GET:  <http://localhost:3000/api/usuarios/me>
Forgot Password POST: <http://localhost:3000/api/usuarios/forgot-password>
Reset Password POST: <http://localhost:3000/api/usuarios/reset-password>

### TEST LOGIN, BODY

- {
  "email": "<test.admin@lcsoluciones.com>",
  "password": "lcsoluciones123456"
  }

## CATEGORIES

### URLS

- FIND       GET:     <http://localhost:3000/api/categorias> *
- FIND ID    GET:     <http://localhost:3000/api/categorias/id> *
- CREATE     POST:    <http://localhost:3000/api/categorias> *
- UPDATE     PATH:    <http://localhost:3000/api/categorias>
- UPDATE ID  PATH:    <http://localhost:3000/api/categorias/id> *
- REMOVE     DELETE:  <http://localhost:3000/api/categorias>
- REMOVE ID  DELETE:  <http://localhost:3000/api/categorias/id> *

### TEST CREATE, BODY

- {
    "Categoria": "Fabricaciones",
    "Estado": "published",
  }

# Commands

- cd lcs-admin-app
- npm run dev
- npm run build
- npm run start
- <http://localhost:3000/admin/login>

# Creating User

- <test.admin@lcsoluciones.com>
- lcsoluciones123456
