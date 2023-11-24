import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "mycontacts",
});

client.connect();

export const query = async (query) => {
  try {
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    console.error(error, "Erro ao executar essa query.");
  }
};

query("SELECT * FROM contacts").then(console.log);
