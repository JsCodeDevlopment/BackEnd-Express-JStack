import { IMock } from "../../interfaces/IMockUsers";
import { v4 } from "uuid";

let ContactsBD: IMock[] = [
  {
    id: v4(),
    name: "ziriguidum",
    email: "ziri@guidum.com",
    phone: "7894568852",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "tontoinho",
    email: "totoim@mail.com",
    phone: "7894568852",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "cabeça di gelo",
    email: "cabeca@mail.com",
    phone: "7894568852",
    category_id: v4(),
  },
];

export class ContactRepository {
  findAll(): Promise<IMock[]> {
    return new Promise((resolve, reject) => {
      resolve(ContactsBD);
    });
  }

  findById(id){
    return new Promise((resolve) => {
      resolve(ContactsBD.find((contact) => contact.id === id))
    });
  }

  findByEmail(email){
    return new Promise((resolve) => {
      resolve(ContactsBD.find((contact) => contact.email === email))
    });
  }

  create({ name, email, phone, category_id }: Omit<IMock, "id">){
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone, 
        category_id
      }
      ContactsBD.push(newContact)

      resolve(newContact)
    });
  }

  update(id, { name, email, phone, category_id }: Omit<IMock, "id">){
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone, 
        category_id
      }
      ContactsBD = ContactsBD.map((contact) => (
        contact.id === id ? updateContact : contact
      ))
      resolve(updateContact)
    });
  }

  delete(id): Promise<void>{
    return new Promise((resolve) => {
      ContactsBD = ContactsBD.filter((contact) => contact.id !== id)
      resolve()
    });
  }
}
