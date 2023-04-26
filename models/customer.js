module.exports = (sequelize,DataTypes)=>{

const Customer = sequelize.define('customers', {
    username: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, { timestamps: false });//created data and updated data has been not create in database.
  return Customer;
}