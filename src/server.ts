import express from "express";
import { router } from "./routes";
import { ErrorHandler } from "./app/middlewares/ErrorHandler";


const app = express();
export const PORT = 3333;

app.use(express.json())
app.use(router);
app.use(ErrorHandler.errorHandler)

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
