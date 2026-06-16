import db from "../config/db.js";

class Claim {
  static async create(data) {
    const {
      user_id,
      title,
      description,
      claim_type,
      amount
    } = data;

    const sql = `
      INSERT INTO claims
      (user_id, title, description, claim_type, amount)
      VALUES (?, ?, ?, ?, ?)
    `;

    return db.execute(sql, [
      user_id,
      title,
      description,
      claim_type,
      amount
    ]);
  }

  static async getByUser(user_id) {
    const [rows] = await db.execute(
      "SELECT * FROM claims WHERE user_id=?",
      [user_id]
    );

    return rows;
  }

  static async getAll() {
    const [rows] = await db.execute(
      "SELECT * FROM claims"
    );

    return rows;
  }

  static async updateStatus(id, status) {
    return db.execute(
      "UPDATE claims SET status=? WHERE id=?",
      [status, id]
    );
  }

  static async assignSurveyor(id, surveyor_id) {
    return db.execute(
      "UPDATE claims SET surveyor_id=? WHERE id=?",
      [surveyor_id, id]
    );
  }
}

export default Claim;