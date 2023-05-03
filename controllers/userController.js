const education = require('../models/education');
var db = require('../models/model')
const { Sequelize , Op ,QueryTypes} = require('sequelize');
User = db.user
Contact = db.contact
user_contacts = db.userContacts
Education = db.education

var addUser = async (req,res) =>{
    const jane = await User.create({ firstName: "bhavik", lastName:"kadvatra" });
    // const jane = User.build({ firstName: "Jane", lastName:"singh" });
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"
    console.log(jane.lastName); // "singh"
    // await jane.save();
    console.log('Jane and singh was saved to the database!');
    console.log(jane.toJSON()); 
    res.status(200).json(jane.toJSON())
}

var getUsers = async(req,res)=>{
    const data = await User.findAll({});
    res.status(200).json({data:data})
}

var getUser =async(req,res)=>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var postUsers = async(req,res)=>{
    var postData = req.body;
    if(postData.length>1){
        // console.log("Post data",postData)
        var data = await User.bulkCreate(postData);
    }
    else{
        // console.log("Post data",postData)
        var data = await User.create(postData);
    }
 
    res.status(200).json({data:data})
}

var deleteUser =async(req,res)=>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var patchUser =async(req,res)=>{
    updatedData = req.body;
    console.log("updatedData",updatedData)
    const data = await User.update(updatedData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var queryUser =async(req,res)=>{

    //create and insert only fields name data extra field will be ignored.
    // const data = await User.create({
    //     firstName: 'kkb',
    //     lastName: 'bhatt'
    //   }, { fields: ['firstName'] });

    //find only specefic attributes and rename using alias array.  
    //   const data = await User.findAll({
    //     attributes: ['id' , ['firstName','first_name'],
    //     [Sequelize.fn('COUNT', Sequelize.col('id')),'count']]
    //   });

    //find only include attributes and ignore all column named in exclude.
    //   const data = await User.findAll({
    //     attributes: {include:['id'],
    //                 exclude:['firstName']
    //             }
    //       });

    //ap.and = oprend and find id=8 AND firstName = kartik in database.
    // const data = await User.findAll({
    //     where: {
    //         [Op.and]: [
    //           { id: 8 },
    //           { firstName: 'kartik' }
    //         ]
    //       }
    //     });

    //group by id . and order will be descending.
    // const data = await User.findAll({
    //     order: [
    //         ['id', 'DESC']
    //     ],
    //     group: 'id'
    //     });

    //find data from 5th number row data to 5 next row data.
        const data = await User.findAll({
            offset: 5,
            limit: 5
        });
    res.status(200).json({data:data})
}

var getSetVirtualUser =async(req,res)=>{
    const data = await User.findAll({
        where:{
            lastName:'modi'
        }
    });

    // const data = await User.create({
    //         firstName:'Manthan',
    //         lastName:'patel'
    // });
    res.status(200).json({data:data})
}

var validateUser =async(req,res)=>{
    var data = {}
    var messages ={}
    try{
        const data = await User.create({
            firstName:'chirag',
            lastName:'suthar'
        });
    }
    catch(e){
        // console.log(e.errors)
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isAlpha':
                    message = "Only alphabetical value has been allowed"
                    break;
                
                case 'isLowercase':
                    message = "only lowercase value can bee allowed"
                }
                messages[error.path] = message;
            })
    }
    res.status(200).json({data:data,messages:messages})
}

var rawQueriesUser = async(req,res)=>{
    // const users = await db.sequelize.query("SELECT * FROM `Users`",
    //  { type: QueryTypes.SELECT,
    //     model: User,
    //     mapToModel: true 
    //  });

    const users = await db.sequelize.query(
      'SELECT * FROM Users WHERE lastName = ?',
      {
        replacements: ['modi'],
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json({data:users})
}

  var pagination = async (req, res) => {
    const { page, size } = req.query;
    console.log("page",page)
    console.log("size",size)
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    console.log("limit",limit)
    console.log("offset",offset)

    // const { limit, offset } = getPagination(page, size);
   
    const data = await User.findAndCountAll({ limit, offset })
        try{
            // console.log("data",data)
            res.status(200).json({data:data})
        }
        catch{
            console.log("error")
        }
};

  var searching =async(req,res)=>{
    const where = {}
    let { firstName , lastName } = req.query;
    let multi = req.query.multi
    if (firstName) where.firstName = {[Op.like]: `%${firstName.trim()}%`}
    if (lastName) where.lastName = {[Op.like]: `%${lastName.trim()}%`}
    console.log("firstName , lastName",firstName,lastName)

    console.log("multi",multi)
    const data = await User.findAll({
        where:{
            [Op.and]:
                where
    }})
    res.status(200).json({data:data})
}

var sorting =async(req,res)=>{
    const { orderBy , orderType} = req.query
    console.log("orderBy",orderBy)
    console.log("orderType",orderType)
    console
    const data = await User.findAll({
        order:[
            [`${orderBy}`,`${orderType}`]
        ]
    })
    res.status(200).json({data:data})
}

var oneToOneUser = async(req,res)=>{
    //data inserted in User table
    var data = await User.create({
        firstName:'manthan',
        lastName:'patel'
    })

    //data inserted in contact table using user_id (forigin_key) 
    if(data && data.id){
        await Contact.create({
            parmanentAddress:'rajkot',
            'currentAddress':'alhabad',
            'userId':data.id
        })
    }

    //when we get first contact id then we use contact table name insted of user table. in all place and because of that all attributes and condition was change 
    var data = await User.findAll({
        attributes:['firstName','lastName'], 
        include:[{
            model:Contact,
            attributes:['parmanentAddress','currentAddress']
        }]

    })
    res.status(200).json({data:data})

}

var oneToManyUser = async(req,res)=>{
    // data inserted in User table
    // var data = await User.create({
    //     firstName:'romiyo',
    //     lastName:'desuza'
    // })

    // // data inserted in contact table using user_id (forigin_key) 
    // if(data && data.id){
    //     await Contact.create({
    //         parmanentAddress:'afganistan',
    //         'currentAddress':'bombay',
    //         'userId':data.id
    //     })
    // }

    // await Contact.create({
    //     parmanentAddress:'gokuldham',
    //     'currentAddress':'gelexy',
    //     'userId':3
    // })

    var data = await User.findAll({
            attributes:['firstName','lastName'], 
            include:[{
                model:Contact, // Eager Loading
                attributes:['parmanentAddress','currentAddress']
            }]    
        })

        // var contactdata = await data.getContacts();  Lazy loading

    res.status(200).json({data:data})

}

var manyToManyUser = async(req,res)=>{

    // data inserted in User table
    var data = await User.create({
        firstName:'bharagav',
        lastName:'chaudhary'
    })

    //data inserted in contact table using user_id (forigin_key) 
    if(data && data.id){
        var contact = await Contact.create({
            parmanentAddress:'usa',
            'currentAddress':'ladakh',
            'userId':data.id
        })
        if(data.id && contact.id){
            await user_contacts.create({
                'UserId':data.id,
                'contactId':contact.id
            })
        }
    }

    //many-to-many reletionship occuring to (contact-user)
    // var data = await Contact.findAll({
    //     attributes:['parmanentAddress','currentAddress'], 
    //     include:[{
    //         model:User,
    //         attributes:['firstName','lastName']
    //     }]    
    // })

    //many-to-many reletionship occuring to (user-contact)
    var data = await User.findAll({
        attributes:['firstName','lastName'], 
        include:[{
            model:Contact,
            attributes:['parmanentAddress','currentAddress']
        }]    
    })

    res.status(200).json({data:data})

}

var paranoidUser = async(req,res)=>{
    // var data = await User.create({
    //     firstName:'rakesh',
    //     lastName:'kaka'
    // })

    var data =await User.destroy({
        where: {
          id: 2
        },
    //     // force: true // this function can do hard delete from database 
      });

    //   var data = await User.restore(); this function can set null value in soft_delete column

    //   var data = await User.findAll({}) this function can retrive only those value soft_delete =null
    res.status(200).json({data:data})

}

var eagerUser = async(req,res)=>{
//User-->Contact
//User-->Education
     var data = await User.findAll({
            attributes:['firstName','lastName'], 
            include:[{
                model:Contact, // Eager Loading
                attributes:['parmanentAddress','currentAddress'], //by default LEFT OUTER JOIN
                // required:true // for use INNERJOIN query

                required:false,//for use RIGHT OUTER JOIN
                right:true
            },{
                model:Education
            }]    
        })

    res.status(200).json({data:data})

}

var creatorUser = async(req,res)=>{

    //data inserted in User table
    // var data = await User.create({
    //     firstName:'manthan',
    //     lastName:'patel'
    // })

    //data inserted in contact table using user_id (forigin_key) 
    // if(data && data.id){
    //     await Contact.create({
    //         parmanentAddress:'rajkot',
    //         'currentAddress':'alhabad',
    //         'userId':data.id
    //     })
    // }

    await Contact.bulkCreate([{
        parmanentAddress:'vrundavan',
        currentAddress:'naroda',
        User:{//model name
            firstName:'nirav',
            lastName:'suthar'
        }
    },{
        parmanentAddress:'gift city',
        currentAddress:'gandhinaghar',
        User:{//model name
            firstName:'darshan',
            lastName:'suthar'
        }
    }],{
        include:[db.contactUser]    
    })

    var data = await User.findAll({
        include:{
            model:Contact
        }
    })
    res.status(200).json({data:data})

}

var mnAssociation = async(req,res)=>{

    // const amidala = await db.customer.create({
    //     username: 'p4dm3',
    //     points: 1000
    // });
    // const queen = await db.profile.create({
    //     name: 'Queen' 
    // });
    // await amidala.addProfile(queen, { through: { selfGranted: false } }); //lazy loading 
    // const result = await db.customer.findOne({
    //     where: { username: 'p4dm3' },
    //     include: db.profile
    // });
    // console.log(result);

    const amidala = await db.customer.create({
        username: 'jj',
        points: 1000,
        profiles: [{//model name
          name: 'Queenjj',
          grant: {
            selfGranted: true
          }
        }]
      }, {
        include: db.profile
      });
      
    //   const result = await db.customer.findOne({
    //     where: { username: 'jj' },
    //     include: db.profile
    //   });
      
    //   console.log(result);


    var result = await db.customer.findAll({
        include: {
          model: db.grant,
          include: db.profile
        }
      });

    res.status(200).json({data:result})


}

var m2m2mUser = async(req,res)=>{

    await db.player.bulkCreate([
        { username: 's0me0ne' },
        { username: 'empty' },
        { username: 'greenhead' },
        { username: 'not_spock' },
        { username: 'bowl_of_petunias' }
      ]);
      await db.game.bulkCreate([
        { name: 'The Big Clash' },
        { name: 'Winter Showdown' },
        { name: 'Summer Beatdown' }
      ]);
      await db.team.bulkCreate([
        { name: 'The Martians' },
        { name: 'The Earthlings' },
        { name: 'The Plutonians' }
      ]);

      await db.gameTeam.bulkCreate([
        { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
        { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
        { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
        { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
        { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
        { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
      ]);

      await db.playerGameTeam.bulkCreate([
        // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
        { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
        { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
        { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
        { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
      ]);

      const data = await db.game.findOne({
        where: {
          name: "Winter Showdown"
        },
        include: {
          model: db.gameTeam,
          include: [
            {
              model: db.player,
            //   through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
            },db.team]
        }
      });
    res.status(200).json({data:data})

}

var scopesUser = async(req,res)=>{
    User.addScope('checkstatus',{
        where:{
            status:[1]
        }
    })
    // var data = await User.scope('checkstatus').findAll({})

    User.addScope('includeContact',{
        include:{
            model:Contact,
            attributes:['parmanentAddress']
        }
    })
    User.addScope('userAttributes',{
            attributes:['firstName']
    })
    var data = await User.scope(['includeContact','userAttributes']).findAll({})


    res.status(200).json({data:data})
}

module.exports = {addUser,getUsers,getUser,postUsers,deleteUser,patchUser,queryUser,getSetVirtualUser,validateUser,rawQueriesUser,pagination,searching,sorting,oneToOneUser,oneToManyUser,manyToManyUser,paranoidUser,eagerUser,creatorUser,mnAssociation,m2m2mUser,scopesUser}