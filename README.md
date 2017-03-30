# Voting App

Free Code Challenge: ...

## Getting Started

### Server folder
* npm install
* nodemon

You need to create the `.env` file in the server folder with these variables:
```
DB_URI = mongodb://theUrlOfTheDb
SECRET = mysecretkey
```

The server is listening on the port 3090.

### Client folder
* npm install
* npm run start

You need to create a file named `config.js` in the client folder with these variables:
```
module.exports = {
    ROOT_URL: 'http://urlOfTheServer'
}
```

The server is listening on the port 8080.

Go to http://localhost:8080

## Built With

### Client
* [React](https://facebook.github.io/react/) - The web framework used
* [Redux](http://redux.js.org/) -  State container for React Apps
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

### Server
* [Express](https://expressjs.com/) - The framework used
* [Mongoose](http://mongoosejs.com/) -  MongoDB Object Modeling
* [Passport](http://passportjs.org/) - authentication for Node.js. In particular JWT (`passport-jwt`) and local strategy (`passport-local`)

## Author

* **Giovanni Fontana** - [Github](https://github.com/fntgnn)


## Acknowledgments
* Learn React and Redux from [Stephen Grider](https://www.udemy.com/user/sgslo/) courses: Modern React with Redux, and Advanced React and Redux
