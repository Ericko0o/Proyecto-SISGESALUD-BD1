import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URL;
    console.log("🔗 Intentando conectar a Mongo con:", mongoUri ? "OK" : "undefined");

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Conectado a MongoDB en Railway");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
  }
};

export default connectMongo;
