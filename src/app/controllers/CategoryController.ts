import { Request, Response } from "express";
import { ICategory } from "../../interfaces/ICategory";
import { CategoryRepository } from "../repositories/CategoriesRepository";

const repositoryCategories = new CategoryRepository();

export class CategoryController {
  async index(req: Request, res: Response): Promise<ICategory[] | undefined> {
    try {
      const { orderBy } = req.query as { orderBy: string }
      const category = await repositoryCategories.findAll(orderBy);
      res.json(category);
    } catch (error) {
      console.error(error, "Erro ao buscar as categorias");
      return undefined
    }
  }

  async store(req: Request, res: Response): Promise<ICategory | undefined> {
    try {
      const { name } = req.body as ICategory;

      if (!name) {
        res.status(400).json({ error: "Nome ausente, esse campo é obrigatório." });
      }

      const categoryExists = await repositoryCategories.findByName(name);

      if (categoryExists) {
        res.status(400).json({ error: "A categoria que você está tentando cadastrar já existe." });
        return;
      }

      const category = await repositoryCategories.create({ name });

      res.json({ category });
    } catch (error) {
      console.error(error, "Não foi possivel criar sua catogoria.");
    }
  }
}
