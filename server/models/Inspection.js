import db from "../config/db.js";

class Inspection {
  static async create(data) {
    const {
      claim_id,
      surveyor_id,
      report,
      images,
      damage_level,
      recommendation
    } = data;

    const sql = `
      INSERT INTO inspection_reports
      (claim_id, surveyor_id, report, images, damage_level, recommendation)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    return db.execute(sql, [
      claim_id,
      surveyor_id,
      report,
      images,
      damage_level,
      recommendation
    ]);
  }

  static async getBySurveyor(id) {
    const [rows] = await db.execute(
      "SELECT * FROM inspection_reports WHERE surveyor_id=?",
      [id]
    );

    return rows;
  }

  static async getByClaim(claim_id) {
    const [rows] = await db.execute(
      "SELECT * FROM inspection_reports WHERE claim_id=?",
      [claim_id]
    );

    return rows;
  }
}

export default Inspection;