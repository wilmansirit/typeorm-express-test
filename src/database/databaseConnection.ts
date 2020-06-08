import { Connection, createConnection } from "typeorm";
import { User } from '../entity/User'
import { DatabaseConfiguration } from './databaseConnectionInterface'

export class DatabaseConnection {

    // Declaration
    private static connect: DatabaseConnection;
    private connection: Connection;
    private configuration: DatabaseConfiguration;

    private constructor() { };

    public static setConnection(): DatabaseConnection {

        if (DatabaseConnection.connect == null) {
            DatabaseConnection.connect = new DatabaseConnection()
        }

        return DatabaseConnection.connect;
    }

    public configure(databaseConfiguration: DatabaseConfiguration) {
        this.configuration = databaseConfiguration;
    }

    public async getConnection(): Promise<Connection> {

        // Si la base de datos nos ha sido configurada...
        if (!this.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const { type, host, port, username, password, database, ssl } = this.configuration;

        this.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            },
            entities: [
                User
            ],
            autoSchemaSync: true // OJO
        } as any);

        return this.connection;

    }
}


