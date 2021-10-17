const {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} = require('amazon-cognito-identity-js');

const { delay } = require('../utils/shared');
const delayTime = 1000;

require('dotenv').config();
const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

const registerUser = async (user, password, attributes) => {
  let cognitoUser, cognitoError;
  userPool.signUp(
    user,
    password,
    attributeList(attributes),
    null,
    (err, result) => {
      if (err) {
        cognitoError = err.message || JSON.stringify(err);
        return;
      }

      cognitoUser = result.user;
    }
  );

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
    onSuccess: function () {},
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

const updateUser = async (user, password, attributes) => {
  const authenticationData = { Username: user, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = { Username: user, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  let cognitoRes, cognitoError;
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function () {},
    onFailure: (err) => (cognitoError = err),
  });
  await delay(delayTime);

  if (cognitoError) return [cognitoError, undefined];

  cognitoUser.updateAttributes(attributeList(attributes), (err, _result) => {
    if (err) {
      cognitoError = err.message || JSON.stringify(err);
      return;
    }
    cognitoRes = 'Update successful';
  });
  await delay(delayTime);

  return [cognitoError, cognitoRes];
};

const attributeList = (attributes) => {
  let attributeList = [];

  attributes.forEach((attr) => {
    const attribute = new CognitoUserAttribute({
      Name: attr.name,
      Value: attr.value,
    });

    attributeList = [...attributeList, attribute];
  });

  return attributeList;
};

module.exports = { registerUser, authenticateUser, updateUser };
