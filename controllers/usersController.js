const amazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};
const userPool = new amazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
    signUp: async function (req, res) {
        const emailData = {
            Name: `email`,
            Value: req.body.email
        };
        const nameData = {
            Name: `name`,
            Value: req.body.name
        };
        const isAdminData = {
            Name: `custom:isAdmin`,
            Value: `false`
        };
        let attributeList = [];
        const emailAttribute = new amazonCognitoIdentity.CognitoUserAttribute(emailData);
        attributeList.push(emailAttribute);
        const nameAttribute = new amazonCognitoIdentity.CognitoUserAttribute(nameData);
        attributeList.push(nameAttribute);
        const isAdminAttribute = new amazonCognitoIdentity.CognitoUserAttribute(isAdminData);
        attributeList.push(isAdminAttribute);
        userPool.signUp(req.body.email, req.body.password,attributeList, null, (err, data) => {
            if (err){
                console.log(err);
                return res.status(400).json({message: "There was a problem with signUp user", data: err});
            }
            res.status(201).json({message: `user saved`, data: data.user});
        });
    },
    signIn: async function (req, res) {
        const loginDetails = {
            Username: req.body.email,
            Password: req.body.password
        };
        const autheficationDetails = new amazonCognitoIdentity.AuthenticationDetails(loginDetails);
        const userDetails = {
            Username: req.body.email,
            Pool: userPool
        };
        const cognitoUser = new amazonCognitoIdentity.CognitoUser(userDetails);
        cognitoUser.authenticateUser(autheficationDetails, {
            onSuccess: data => {
                //console.log('access token + ' + data.getAccessToken().getJwtToken());
                res.status(202).json({message: `authefication succesful`, data: data});
            },
            onFailure: err => {
                console.log(err);
                res.status(400).json({message: "There was a problem with signIn user", data: err});
            }
        })
    },





};