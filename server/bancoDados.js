const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

// Estabelecer conexão com backend
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  // Registrar no terminal o estado da conexão com banco de dados:
  console.log("Database " + connection.state);
});

class modBancoDados {
  static getInstance() {
    return instance ? instance : new modBancoDados();
  }

  // Ler
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM list;";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Registrar
  async insertNewName(item) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO list (item, dataHora) VALUES (?,?);";
        connection.query(query, [item, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        item: item,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // Deletar
  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM list WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Atualizar
  async updateNameById(id, item) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE list SET item = ? WHERE id = ?";
        connection.query(query, [item, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Pesquisar
  async searchByName(item) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM list WHERE item = ?;";
        connection.query(query, [item], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = modBancoDados;
