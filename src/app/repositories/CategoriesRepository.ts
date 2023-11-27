import { ICategory } from "../../interfaces/ICategory";
import { query } from "../database";

export class CategoryRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await query(`
    SELECT * FROM categories
    ORDER BY name ${direction}
    `);
    return rows;
  }

  async findByName(name: string) {
    const result = await query<ICategory[]>(`
    SELECT * FROM categories WHERE name = $1
    `,[name]
    );

    if (result && result.length > 0) {
      const [row] = result;
      return row;
    } else {
      return undefined;
    }
  }

  async create({ name }: Omit<ICategory, "id">) {
    const result = await query<ICategory[]>(`
    INSERT INTO categories (name)
    VALUES($1)
    RETURNING *
    `,[name]
    );

    if (result && result.length > 0) {
      const [row] = result;
      return row;
    } else {
      return undefined;
    }
  }
}
