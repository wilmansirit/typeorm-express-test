
import 'reflect-metadata';
import { DatabaseConnection } from './database/databaseConnection';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { Connection } from 'typeorm';
import { User } from './entity/User';


// Set the Database connection
const database = DatabaseConnection.setConnection();

// Configuring the database
database.configure({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "ormTypeScript",
    password: "IDfH5zNxVB2kMjh8",
    database: "ormTypeScript",
    ssl: false
});

database.getConnection().then(async (connection: Connection) => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {

        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {

            const result = (new (route.controller as any))[route.action](req, res, next);

            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }

        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");


    // const repository = connection.getRepository(User)
    // const users = await repository.find();
    // console.log(users);

}).catch((err: any) => console.log(err));


