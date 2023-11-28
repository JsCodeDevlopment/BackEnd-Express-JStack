import { Router } from "express";
import { ContactController } from "./app/controllers/ContactController";
import { CategoryController } from "./app/controllers/CategoryController";

export const router = Router();

const controllerContact = new ContactController();
const controllerCategory = new CategoryController()

router.get("/contacts", controllerContact.index);
router.get("/contacts/:id", controllerContact.show);
router.delete("/contacts/:id", controllerContact.delete);
router.post("/contacts", controllerContact.store);
router.put("/contacts/:id", controllerContact.update);

router.get("/categories", controllerCategory.index);
router.get("/categories/:id", controllerCategory.show);
router.delete("/categories/:id", controllerCategory.delete);
router.post("/categories", controllerCategory.store);
router.put("/categories/:id", controllerCategory.update);