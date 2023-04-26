module.exports = (sequelize,DataTypes)=>{

const Contact = sequelize.define('contact', {
  UserId:{
    type: DataTypes.INTEGER
  },
  // Model attributes are defined here
  parmanentAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentAddress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
 
}, {
  // Other model options go here
});
return Contact;
}
// module.exports = Contact