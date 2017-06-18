//Including dependency
var Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

//Setting up the config
var sequelize = new Sequelize('moneytor_db', 'root', '1234', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false //takes care of sequelize Not adding 'createdAt and updatedAt' by default in the model 
    }
});

//Checking connection status
sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established @@@@@@@@ successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var User = sequelize.define('Customer', {
    customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: Sequelize.STRING,
    fbuserid: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    }
},
    {
        freezeTableName: true // table created will have the same name as the name passed in define
        //by default Sequelize tend to create table with plural names 
    }
);

module.exports = User;

module.exports.getUserById = function (id, callback) {
    var promise = User.findAll({
        where: {
            customer_id: id
        }
    });
    promise.then(function (data) {
        console.log(data.length);
        if (data.length > 0)
        {
            console.log('userIDfound $$$$$$$$$$$$$$$$$');
            /*console.log(data[0].dataValues);*/ return callback(null, data[0].dataValues);
        }
         

        else
        {
            console.log('userID not found $$$$$$$$$$$$$$$$$$');
            return callback(null, null);
        }
            
    }, console.error);


}

module.exports.getUserByUsername = function (username, callback) {
    console.log('in fn getUSERbYuSERNAME &&&&&$$$$$$$$$$$$$$$' + username);

    var promise = User.findAll({
        where: {
            username: username
        }
    });
    promise.then(function (data) {
        console.log(data.length);
        if (data.length > 0)
        {
            console.log('userfound $$$$$$$$$$$$$$$$$');
            /*console.log(data[0].dataValues);*/ return callback(null, data[0].dataValues);
        }
         

        else
        {
            console.log('user not found $$$$$$$$$$$$$$$$$');
            return callback(null, null);
        }
            
    }, console.error);

}

module.exports.addUser = function (newUser, callback) {
    console.log('in fn AddUser &&&&&$$$$$$$$$$$$$$$');
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            // User.create(newUser,(err,data)=>{
            //     if(err){
            //         console.log(err); callback(err, null);
            //     }
            //     else{
            //         console.log("NO ERRR");
            //         callback(null,null);
            //     }

            // })
           var promise = User.create(newUser);
           promise.then(function (data){
            //    console.log(data);
               callback(null,null)
           },function(err){
               callback(err, null);
            //    console.log(err);
           });
                // .catch(function (err) {
                //     // console.log("###ERR "+err);
                //     callback(err, null);
                // });
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    console.log('in fn ComparePwd &&&&&$$$$$$$$$$$$$$');
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


//faceId verification
module.exports.getUserByFbUserId = function (userid, callback) {
    console.log('in fn getUSERbYuSERID &$$$$' + userid);

    var promise = User.findAll({
        where: {
            fbuserid: userid
        }
    });
    promise.then(function (data) { console.log(data); }, console.error);



}
//adding new fb user in db 
module.exports.addFbUser = function (newUser, callback) {
    User.create(newUser);
}

