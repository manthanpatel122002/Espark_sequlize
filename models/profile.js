module.exports = (sequelize,DataTypes,Model)=>{

const Profile = sequelize.define('profile', {
    name: DataTypes.STRING
  }, { timestamps: false });
  return Profile
}