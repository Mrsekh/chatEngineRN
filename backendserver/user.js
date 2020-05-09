const users = [];

const addUser = (id,name,room) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name && user.room === room);

    if(existingUser) {
        return {error:'User is taken'};
    }

    const newUser = {id,name,room};

    users.push(newUser);
    return newUser;
}

const removeUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex != -1) {
        return users.slice(userIndex,1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = {addUser,removeUser,getUser,getUsersInRoom};