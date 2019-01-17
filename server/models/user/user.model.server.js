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
UserModel.populateClasses = populateClasses;
UserModel.addInterest = addInterest;
UserModel.deleteInterest = deleteInterest;
UserModel.addReminder = addReminder;

function addReminder(uid, reminder) {
    return UserModel.updateOne(
        { _id : uid },
        { $addToSet: { reminders: [ reminder ] } }
    )
}

function addInterest(uid, interest) {
    return UserModel.updateOne(
        { _id : uid },
        { $addToSet: { interests: [ interest ] } }
    )
}

function deleteInterest(uid, interest) {
    return UserModel.updateOne(
        { _id : uid },
        { $pull: { 'interests': interest } }
    )
}

function populateClasses(uid) {
    return UserModel.findOne({ _id: uid })
                    .populate('classes').exec();
}

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
    return UserModel.find()
        .sort({ firstName: 1 })
        .select('-password');
}

function findUserByUsername(username) {
    return UserModel.findOne( { username : username });
}

function updateUser(uid, user) {
    return UserModel.updateOne( { _id: uid }, user);
}

function deleteUser(uid) {
    return UserModel.remove({ _id : uid });
}

module.exports = UserModel;
