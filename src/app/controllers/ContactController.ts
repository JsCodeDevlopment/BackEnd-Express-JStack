import { Request, Response } from "express";
import { IMock } from "../../interfaces/IMockUsers";
import { ContactRepository } from "../repositories/ContactsRepository";

const repositoryContacts = new ContactRepository();

export class ContactController {
  async index(req: Request, res: Response): Promise<IMock[] | undefined> {
    try {
      const { orderBy } = req.query as { orderBy: string }
      const contacts = await repositoryContacts.findAll(orderBy);
      res.json(contacts);
    } catch (error) {
      console.error(error, "Erro ao buscar os contatos");
      return undefined
    }
  }

  async show(req: Request, res: Response): Promise<IMock | undefined> {
    try {
      const { id } = req.params;
      const contact = await repositoryContacts.findById(id);

      if (!contact) {
        res.status(404).json({ error: "sem usuário" });
        return 
      }

      res.json(contact);
    } catch (error) {
      console.error(error, "Erro ao exibir contato.");
    }
  }

  async store(req: Request, res: Response) {
    try{
      const { name, email, phone, category_id } = req.body as IMock

      if (!name) {
        res.status(400).json({error: 'Nome ausente, esse campo é obrigatório.'});
      }

      const contactExists = await repositoryContacts.findByEmail(email)
      if (contactExists) {
        return res.status(400).json({error: 'O contato que você está tentando cadastrar já existe.'})
      }
      const contact = await repositoryContacts.create({
        name, email, phone, category_id
      })

      res.json(contact)
    } catch (error) {
      console.error(error, "Não foi possivel criar seu usuário.")
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, email, phone, category_id } = req.body as IMock

      const contactExists = await repositoryContacts.findById(id)
      
      if(!contactExists){
        res.status(400).json({ error: 'O contato que você está tentando modificar não existe.' })
      }

      if (!name) {
        res.status(400).json({error: 'Nome ausente, esse campo é obrigatório.'});
      }

      const contactEmailExists = await repositoryContacts.findByEmail(email)

      if (contactEmailExists && contactEmailExists.id !== id){
        return res.status(400).json({ error: 'Esse email já está em uso.' })
      }
      
      const contact = await repositoryContacts.update(id, { name, email, phone, category_id } as IMock)

      res.json(contact)
    } catch (error) {
      console.error(error, 'Erro ao editar esse contato.')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contact = await repositoryContacts.findById(id);

      if (!contact) {
        return res
          .status(404)
          .json({ error: "Usuário que você está tentando excluir não exite." });
      }
      await repositoryContacts.delete(id);

      res.sendStatus(204)
    } catch (error) {
      res.sendStatus(500)
      console.error(error, "Erro ao deletar contato");
    }
  }
}
