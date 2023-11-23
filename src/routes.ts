import { Router } from "express";
import { ContactController } from "./app/controllers/ContactController";

export const router = Router();

const controller = new ContactController();

router.get("/contacts", controller.index);
router.get("/contacts/:id", controller.show);
router.delete("/contacts/:id", controller.delete);
router.post("/contacts", controller.store);
router.put("/contacts/:id", controller.update);
