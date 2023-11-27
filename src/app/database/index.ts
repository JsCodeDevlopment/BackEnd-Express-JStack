import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "mycontacts",
});

client.connect();

export const query = async <T>(query: string, values?: any[]): Promise<T> => {
  try {
    const { rows } = await client.query(query, values);
    return rows as T
  } catch (error) {
    console.error(error, "Erro ao executar essa query.");
    throw new Error("Erro ao executar essa query.")
  }
};
