import { IMock } from "../../interfaces/IMockUsers";
import { query } from '../database'

export class ContactRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT * FROM contacts
    ORDER BY name ${direction}
    `)
    return rows
  }

  async findById(id: string){
    const result = await query(`
    SELECT * FROM contacts WHERE id = $1
    `, [id])

    if(result && result.length > 0){
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async findByEmail(email: string){
    const result = await query(`
    SELECT * FROM contacts WHERE email = $1
    `, [email])
    
    if(result && result.length > 0){
      const [row] = result
      return row
    } else {
      return undefined
    }
  }

  async create({ name, email, phone, category_id }: Omit<IMock, "id">){
    const result = await query(`
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

  async update(id: string, { name, email, phone, category_id }: Omit<IMock, "id">){
    const result = await query(`
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
