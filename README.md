## About the Project

Codeminer's backend project repository.<br>
The project aims to manage a system of cargo transport trips between space stars.

## Technology Used
This project is mainly composed by Javascript and uses the following frameworks:

- [Express v4.17.1](https://expressjs.com)
- [Mongoose v5.11.2](https://mongoosejs.com/)

## How to Begin
To start, it is necessary to contain the technologies below on the machine that will run the project:

- [Node v12.21.0](https://nodejs.org/ja/blog/release/v12.21.0/)
- [NPM v6.14.8](https://www.npmjs.com/) (Included in Node.js)

### Prerequisites
```
# To verify the installation of Node and NPM
node -v
npm -v
```

### Installation and Execution
```sh
1. Clone the repository to your machine
git https://github.com/Pedrohcs/codeminer.git

2. Instale os pacotes NPM
npm install

3. Install NPM packages
npm start

4. Run project tests
npm test
```

#### Banco de Dados
The database technology chosen for this project was NoSQL, in this case MongoDB. Where the project runs with the cloud database, which is allocated in the Atlas service: MongoDB. With the mongoose framework the database structure is created dynamically.<br>
Furthermore, migrations were implemented to validate and create, if necessary, the initial data of locations (planets, asteroires...) and the available routes.

## API
The project is a public API, so a documentation was created that through the framework:

- [Swagger Ui Express v4.1.4](https://www.npmjs.com/package/swagger-ui-express/v/4.1.4)

To access the documentation, first run the system and then access the following url:<br>
https://www.npmjs.com/package/swagger-ui-express/v/4.1.4
