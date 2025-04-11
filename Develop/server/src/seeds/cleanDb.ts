import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model || !model.db?.db) {
      console.warn(`[cleanDb] Skipping collection: "${collectionName}". Model or DB not initialized.`);
      return;
    }

    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(`[cleanDb] Error cleaning "${collectionName}":`, err);
    throw err;
  }
}
