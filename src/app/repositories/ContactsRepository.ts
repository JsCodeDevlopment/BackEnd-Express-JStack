import { IUser } from "../../interfaces/IUser";
import { query } from '../database'

export class ContactRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT contacts.*, categories.name AS category_name 
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}
    `)
    return rows
  }

  async findById(id: string){
    const result = await query<IUser[]>(`
    SELECT contacts.*, categories.name AS category_name 
    FROM contacts 
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id])

    if(result && result.length > 0){
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const result = await query<IUser[]>(`
    SELECT * FROM contacts WHERE email = $1
    `, [email])
    if(result && result.length > 0){
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async create({ name, email, phone, category_id }: Omit<IUser, "id">){
    const result = await query<IUser[]>(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id])

    if (result && result.length > 0) {
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async update(id: string, { name, email, phone, category_id }: Omit<IUser, "id">){
    const result = await query<IUser[]>(`
    UPDATE contacts
    SET name = $2, email = $3, phone = $4, category_id = $5
    WHERE id = $1
    RETURNING *
    `, [id, name, email, phone, category_id])

    if (result && result.length > 0) {
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async delete(id: string): Promise<void>{
    await query(`
    DELETE FROM contacts WHERE id = $1
    `, [id])
  }
}
