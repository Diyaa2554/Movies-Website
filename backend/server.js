import express from "express"
import core from "core"
import review from "./api/review.route.js"
const app = express
app.use(core())
app.use(express.json())

app.use("/apo/v1/reviews", reviews)

app.use("*", (req, res) =>
res.status(404).json({error: "not found"}))

export default app