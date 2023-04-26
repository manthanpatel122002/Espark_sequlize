module.exports = (sequelize,DataTypes,Customer,Profile)=>{

    const Grant = sequelize.define('grant', {
        selfGranted: DataTypes.BOOLEAN,
        customerId: {
          type: DataTypes.INTEGER,
          references: {
            model: Customer, // 'Customer' would also work
            key: 'id'
          }
        },
        profileId: {
          type: DataTypes.INTEGER,
          references: {
            model: Profile, // 'Profile' would also work
            key: 'id'
          }
        }
      });
      return Grant;
    }