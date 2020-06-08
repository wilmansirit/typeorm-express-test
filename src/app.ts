
import 'reflect-metadata';
import { DatabaseConnection } from './database/databaseConnection';
import { User } from "./entity/User"

DatabaseConnection.configure({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "ormTypeScript",
    password: "IDfH5zNxVB2kMjh8",
    database: "ormTypeScript",
    ssl: false
});

const createConnection = DatabaseConnection.getConnection();
console.log("Numero de Instancias creadas: ", DatabaseConnection.numeroInstancias);

createConnection.then(async connection => {

    const users = await connection.manager.find(User)
    console.log(users);

}).catch(err => console.log(err));


