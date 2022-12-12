import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTERNAME}.dwwgxoe.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();

  return documents;
}
