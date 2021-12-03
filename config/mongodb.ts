import { MongoClientOptions } from 'mongodb';

export const getMongoConfig = () => {
  const mongoHost = process.env.MONGO_HOST;
  const mongoPort = process.env.MONGO_PORT;
  const mongoDBName = process.env.MONGO_DB_NAME;
  const mongoUser = process.env.MONGO_USER;
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoReplicaSet = process.env.MONGO_REPLICA_SET;
  const mongoAuthMech = process.env.MONGO_AUTH_MECH;

  const mongoOptions: MongoClientOptions = {};
  if (mongoReplicaSet) {
    mongoOptions.replicaSet = mongoReplicaSet;
  }
  if (mongoAuthMech) {
    mongoOptions.authMechanism = mongoAuthMech;
  }

  return {
    client: {
      host: mongoHost,
      port: mongoPort,
      name: mongoDBName,
      options: mongoOptions,
      user: mongoUser,
      password: mongoPassword,
    },
  };
};
