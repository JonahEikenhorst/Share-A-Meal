const { AssertionError } = require('assert');
const assert = require('assert');
let database = [];
let id = 0;
let controller = {
    validateUser: (req, res, next) => {
        let user = req.body;
        let { emailAdress, password} = user;

        try {
            assert(typeof emailAdress == 'string', 'Email Adress must be a string')
            assert(typeof password == 'string', 'Password must be a string')
            next();
        }
        catch (err) {
            const error = {
                status: 400,
                result: err.message,
            };
            console.log(err.code);
            console.log(err.message);
            res.status(400).json({
                status:400,
                result: err.toString(),
            });
            next(error);
        }



    },
    addUser: (req, res) => {
        let email = req.body.emailAdress;
        if (database.filter((item) => item.emailAdress == email).length > 0) {
            res.status(400).json({
                Status: 400,
                Message: `An user with this Email adress already exists!`
            })
        }
        else {
            let user = req.body;
            console.log(user);
            id++
            user = {
                id,
                ...user,
            };

            database.push(user);
            console.log(database);
            res.status(201).json({
                status: 201,
                result: database,
            });
        }
    },
    getUsers: (req, res) => {
        res.status(200).json({
            status: 200,
            result: database
        });
    },

    getUserById: (req, res, next) => {
        const userId = req.params.userId
        let user = database.filter((item) => item.id == userId);
        if (user.length > 0) {
            console.log(user)
            res.status(200).json({
                status: 200,
                result: user,
            })
        }
        else {
            const error = {
                status: 404,
                result: `User with ID ${userId} not found`,
            };
            next(error);
        }
    },

    deleteUser: (req, res, next) => {
        const userId = Number(req.params.userId)
        //check if id is in database
        let user = database.filter((item) => item.id == userId);
        if (user.length > 0) {

            //check the index of userId
            var index = database.map(x => {
                return x.id;
            }).indexOf(userId);

            //Remove the id from array
            console.log("INDEX OF " + index)
            database.splice(index, 1);
            console.log(database);

            res.status(200).json({
                status: 200,
                result: `User with ID ${userId} has been deleted.`,
            })
        } else {
            const error = {
                status: 404,
                result: `User with ID ${userId} not found.`,
            };
            next(error);
        }
    },

    editUser: (req, res, next) => {
        const id = Number(req.params.userId)
        let email = req.body.Email;
        let user = database.filter((item) => item.id == id);

        if (user.length > 0) {
            if (database.filter((item) => item.Email == email).length > 0) {
                res.status(400).json({
                    Status: 400,
                    Message: `This email is already taken.`
                })
            } else {
                var index = database.map(x => {
                    return x.id;
                }).indexOf(id);

                console.log("INDEX OF " + index)
                database.splice(index, 1);
                console.log(database);

                let newUser = req.body;
                console.log(newUser);
                newUser = {
                    id,
                    ...newUser,
                };
                database.push(newUser);
                console.log(database);
                res.status(200).json({
                    status: 200,
                    result: User`with ID ${id} has been updated.`,
                })
            }
        } else {
            const error = {
                status: 404,
                result: `User with ID ${id} not found.`,
            }
            next(error);
        }
    }
};
module.exports = controller;