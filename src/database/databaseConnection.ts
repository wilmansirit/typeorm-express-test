import { Connection, createConnection } from "typeorm";
import { User } from '../entity/User'
import { DatabaseConfiguration } from './databaseConnectionInterface'

export class DatabaseConnection {

    // Declaration
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;
    public static numeroInstancias: number = 0;

    private constructor() { };

    public static configure(databaseConfiguration: DatabaseConfiguration) {
        DatabaseConnection.configuration = databaseConfiguration;
    }

    public static async getConnection(): Promise<Connection> {

        // Si la conexión a bases de datos existe devuelve la conexión, si no la crea
        if (DatabaseConnection.connection != null) return DatabaseConnection.connection;

        DatabaseConnection.numeroInstancias++;

        // Si la base de datos nos ha sido configurada...
        if (!DatabaseConnection.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const { type,
            host,
            port,
            username,
            password,
            database,
            ssl } = DatabaseConnection.configuration;

        DatabaseConnection.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            },
            entities: [
                User
            ],
            autoSchemaSync: true
        } as any);

        return DatabaseConnection.connection;

    }

}


