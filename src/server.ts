import express from "express";
import { router } from "./routes";

const app = express();
export const PORT = 3333;

app.use(express.json())
app.use(router);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
