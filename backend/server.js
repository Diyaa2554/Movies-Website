import express from "express";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(express.json());
app.use("/api/v1/reviews", reviews);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
});

export default app;
