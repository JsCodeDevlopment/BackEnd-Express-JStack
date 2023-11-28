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
      return
    }
  }

  async show(req: Request, res: Response): Promise<ICategory | undefined> {
    try {
      const { id } = req.params
      const category = await repositoryCategories.findById(id);

      if (!category) {
        res.status(404).json({ error: "sem categoria" });
        return 
      }

      res.json(category);
    } catch (error) {
      console.error(error, "Erro ao exibir a categoria.");
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

  async update(req: Request, res: Response): Promise<ICategory | undefined> {
    try {
      const { id } = req.params
      const { name } = req.body as ICategory

      const categoryExists = await repositoryCategories.findById(id)

      if(!categoryExists){
        res.status(400).json({ error: 'A categoria que você está tentando modificar não existe.' })
      }

      if (!name) {
        res.status(400).json({error: 'Nome ausente, esse campo é obrigatório.'});
      }

      const contactEmailExists = await repositoryCategories.findByName(name)

      if (contactEmailExists && contactEmailExists.id !== id){
        res.status(400).json({ error: 'Essa categoria já está em uso.' })
        return 
      }
      
      const category = await repositoryCategories.update(id, { name } as ICategory)

      res.json(category)
    } catch (error) {
      console.error(error, 'Erro ao editar essa categoria.')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await repositoryCategories.findById(id);

      if (!category) {
        return res.status(404).json({ error: "Categoria que você está tentando excluir não exite." });
      }

      await repositoryCategories.delete(id);

      res.sendStatus(204)
    } catch (error) {
      res.sendStatus(500)
      console.error(error, "Erro ao deletar a categoria");
    }
  }
}
