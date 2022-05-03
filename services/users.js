const UserModel = require("../models/User");

class Users {
  async getAll() {
    const users = await UserModel.find();
    return users;
  }

  async create(data) {
    const newUser = new UserModel({
      username: data.username,
      email: data.email,
      password: await UserModel.encryptPassword(data.password),
    });
    const results = await newUser.save();
    return results;
  }

  async update(id, data) {
    const newData = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return newData;
  }

  async delete(id) {
    const result = await UserModel.findByIdAndDelete(id);
    return result;
  }
}

module.exports = Users;
