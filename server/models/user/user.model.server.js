const mongoose = require('mongoose');
const UserSchema = require('./user.schema.server');
const UserModel = mongoose.model('UserModel', UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUsers = findUsers;
UserModel.findUserByUsername = findUserByUsername;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

function createUser(user) {
    return UserModel.create(user);
}

function findUserById(uid) {
    return UserModel.findById(uid);
}

function findUserByCredentials(username, password) {
    return UserModel.findOne({ username: username, password: password });
}

function findUsers() {

}

function findUserByUsername(username) {

}

function updateUser(uid, user) {

}

function deleteUser(uid) {

}

module.exports = UserModel;
