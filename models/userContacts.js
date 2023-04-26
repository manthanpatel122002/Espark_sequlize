module.exports = (sequelize,DataTypes,User,Contact)=>{

const userContacts = sequelize.define('user_contacts', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'user' would also work
        key: 'id'
      }
    },
    contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: Contact, // 'contact' would also work
        key: 'id'
      }
    }
  });
  return userContacts;
}