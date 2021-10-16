const {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} = require('amazon-cognito-identity-js');

const { delay } = require('../utils/shared');
const delayTime = 750;

require('dotenv').config();
const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

const registerUser = async (user, password, attributes) => {
  let attributeList = [];

  attributes.forEach((attr) => {
    const attribute = new CognitoUserAttribute({
      Name: attr.name,
      Value: attr.value,
    });

    attributeList = [...attributeList, attribute];
  });

  let cognitoUser, cognitoError;
  userPool.signUp(user, password, attributeList, null, (err, result) => {
    if (err) {
      cognitoError = err.message || JSON.stringify(err);
      return;
    }

    cognitoUser = result.user;
  });

  await delay(delayTime);
  return [cognitoError, cognitoUser];
};

const authenticateUser = async (user, password) => {
  const authenticationData = { Username: user, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = { Username: user, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  let cognitoRes, cognitoError;
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async (result) => (cognitoRes = result),
    onFailure: (err) => (cognitoError = err),
  });

  await delay(delayTime);

  if (cognitoError) return [cognitoError, undefined];
  cognitoRes = await retrieveUser(cognitoUser);

  return [undefined, cognitoRes];
};

const retrieveUser = async (cognitoUser) => {
  let attributes = {};
  let cognitoRes;

  cognitoUser.getUserAttributes((err, result) => {
    if (err) {
      console.log(err.message || JSON.stringify(err));
      return;
    }
    cognitoRes = result;
  });

  await delay(delayTime);
  cognitoRes.forEach((attr) => {
    attributes[attr.getName()] = attr.getValue();
  });

  return attributes;
};

const updateUser = () => {};

module.exports = { registerUser, authenticateUser, updateUser };
