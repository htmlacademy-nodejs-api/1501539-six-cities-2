export type MongoURIParams = {
  username: string,
  password: string,
  host: string,
  port:string,
  databaseName: string
}

export const getMongoURI = ({
  username,
  password,
  host,
  port,
  databaseName
} : MongoURIParams): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;

