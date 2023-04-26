module.exports = (sequelize,DataTypes)=>{

    const Education = sequelize.define('educations', {
      UserId:{
        type: DataTypes.INTEGER
      },
      // Model attributes are defined here
      className: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING
      },
      passingYear: {
        type: DataTypes.INTEGER
      },
     
    }, {
      // Other model options go here
    });
    return Education;
    }
    // module.exports = Contact