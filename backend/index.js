import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./api/dao/reviewsDAO.js";
import dotenv from "dotenv";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const pass = process.env.PASSWORD;
const uri = `mongodb+srv://diyaarora1919:${pass}@cluster0.vehrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

MongoClient.connect(uri, {
    maxPoolSize: 50,
    serverSelectionTimeoutMS: 5000, // Helps with connection issues
})
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDb(client);
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
        
    });