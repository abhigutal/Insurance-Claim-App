import db from "../config/db.js";

class User {
  static async create(userData) {
    const {
      fullName,
      email,
      mobile,
      adhaar,
      dob,
      gender,
      address,
      username,
      password,
      role
    } = userData;

    const query = `
      INSERT INTO users
      (
        full_name,
        email,
        mobile,
        adhaar,
        dob,
        gender,
        address,
        username,
        password,
        role
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      fullName,
      email,
      mobile,
      adhaar,
      dob,
      gender,
      address,
      username,
      password,
      role
    ]);

    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username=?",
      [username]
    );

    return rows[0];
  }

  static async findByMobile(mobile) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE mobile=?",
      [mobile]
    );

    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id=?",
      [id]
    );

    return rows[0];
  }

  static async updatePassword(id, password) {
    const [result] = await db.execute(
      "UPDATE users SET password=? WHERE id=?",
      [password, id]
    );

    return result;
  }

  static async updateRole(id, role) {
  const [result] = await db.execute(
    "UPDATE users SET role=? WHERE id=?",
    [role, id]
  );

  return result;
}

  static async getAllUsers() {
    const [rows] = await db.execute(
      "SELECT * FROM users"
    );

    return rows;
  }

  static async deleteUser(id) {
    const [result] = await db.execute(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    return result;
  }
}

export default User;