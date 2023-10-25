const User = require('./user');
const Location = require('./location');

User.hasMany(Location, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Location.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

module.exports = {
    User, Location
};