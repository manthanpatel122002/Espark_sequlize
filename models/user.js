// const { toDefaultValue } = require("sequelize/types/utils");

module.exports = (sequelize,DataTypes,Model)=>{

class User extends Model {}

User.init({
  // Model attributes are defined here
  status:{
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isAlpha:true,
      isLowercase: true,
    },
    // get() {
    //   const rawValue = this.getDataValue('firstName');
    //   return rawValue ? rawValue.toUpperCase() : null;
    // }
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
    defaultValue:'singh',
    // set(value){
    //   this.setDataValue('lastName',value+',indian')
    // }
  },

  //fullname can combine firstname and lastname value and find them.
  fullName: {
    type: DataTypes.VIRTUAL
    // get() {
    //   return `${this.firstName} ${this.lastName}`;
    // },
    // set(value) {
    //   throw new Error('Do not try to set the `fullName` value!');
    // }
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  paranoid:true,
  deletedAt: 'soft delete'
});
return User;

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
}
