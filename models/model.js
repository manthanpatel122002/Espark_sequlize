const { Sequelize , Model , DataTypes} = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.sequelize = sequelize;
  db.sequelize = sequelize;

  db.contact=require('./contact')(sequelize,DataTypes)
  db.user=require('./user')(sequelize,DataTypes,Model)
  db.userContacts=require('./userContacts')(sequelize,DataTypes,db.user,db.contact)

  db.education=require('./education')(sequelize,DataTypes)

  db.customer=require('./customer')(sequelize,DataTypes)
  db.profile=require('./profile')(sequelize,DataTypes)
  db.grant=require('./customerProfiles')(sequelize,DataTypes,db.customer,db.profile)


  
  

  

  //advanced many-to-many
  

  //one-to-one
  db.user.hasOne(db.contact);//f id name is not match then enter by default forigin key name {foreignKey: {name: 'myFooId'}}
  db.contact.belongsTo(db.user);

  //one-to-many
  db.user.hasMany(db.contact);//f id name is not match then enter by default forigin key name {foreignKey: {name: 'myFooId'}}
  db.contactUser = db.contact.belongsTo(db.user);

  db.user.hasMany(db.education);
  db.education.belongsTo(db.user);

  //many-to-many
  // db.user.belongsToMany(db.contact, { through: db.userContacts });
  // db.contact.belongsToMany(db.user, { through: db.userContacts });

  db.customer.belongsToMany(db.profile, { through: db.grant});
  db.profile.belongsToMany(db.customer, { through: db.grant});

  // Setup a One-to-Many relationship between User and Grant
  db.customer.hasMany(db.grant);
  db.grant.belongsTo(db.customer);
  // Also setup a One-to-Many relationship between Profile and Grant
  db.profile.hasMany(db.grant);
  db.grant.belongsTo(db.profile);



  db.player = sequelize.define('Player', { username: DataTypes.STRING });
  db.team = sequelize.define('Team', { name: DataTypes.STRING });
  db.game = sequelize.define('Game', { name: DataTypes.STRING });

  db.gameTeam = sequelize.define('GameTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });
  //many-to-many
  db.team.belongsToMany(db.game, { through: db.gameTeam });
  db.game.belongsToMany(db.team, { through: db.gameTeam });

  //one-to-many+one-to-many=many-to-many
  db.team.hasMany(db.gameTeam);
  db.gameTeam.belongsTo(db.team);
  db.game.hasMany(db.gameTeam);
  db.gameTeam.belongsTo(db.game);



  db.playerGameTeam = sequelize.define('PlayerGameTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });
  db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
  db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });

  db.gameTeam.hasMany(db.playerGameTeam);
  db.playerGameTeam.belongsTo(db.gameTeam);
  db.player.hasMany(db.playerGameTeam);
  db.playerGameTeam.belongsTo(db.player);

  db.sequelize.sync({ force: false})
  module.exports = db
