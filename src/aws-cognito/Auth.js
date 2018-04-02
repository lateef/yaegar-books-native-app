import AWS from 'aws-sdk';
import awsmobile from '../aws-exports';

import {CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js'

import LocalStorage from '../local-storage';

const userPool = new CognitoUserPool({
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id,
});

function handleNewCustomerRegistration(username, password, email, phoneNumber, registerCallBack) {
    const dataEmail = {
        Name: 'email',
        Value: email
    };
    const dataPhone = {
        Name: 'phone_number',
        Value: phoneNumber
    };

    const dataSetupState = {
        Name: 'custom:setup_state',
        Value: 'NEW'
    };

    const userAttributes = [];
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePhone = new CognitoUserAttribute(dataPhone);
    const attributeSetupState = new CognitoUserAttribute(dataSetupState);

    if (dataEmail.Value) {
        userAttributes.push(attributeEmail);
    }
    if (dataPhone.Value) {
        userAttributes.push(attributePhone);
    }
    userAttributes.push(attributeSetupState);

    userPool.signUp(username, password, userAttributes, null, registerCallBack);
}

function handleSignIn(username, password, loginCallBack) {
    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });
    let cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, loginCallBack);
}

function handleForgotPassword(username, forgotPasswordCallBack) {
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });
    cognitoUser.forgotPassword(forgotPasswordCallBack);
}

function handleForgotPasswordReset(username, verificationCode, newPassword, forgotPasswordCallBack) {
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });
    cognitoUser.confirmPassword(verificationCode, newPassword, forgotPasswordCallBack);
}

function handleSignOut() {
    const cognitoUser = getCurrentUser();

    cognitoUser.signOut();
    LocalStorage.removeItem('currSession');
    LocalStorage.removeItem('awsCredentials');
    LocalStorage.setItem('isLoggedIn', false);
}

function handleUnregisterCustomer(unregisterCallBack) {
    const cognitoUser = getCurrentUser();
    cognitoUser.getSession((e, s) => console.log(e || 'session acquired = session.isValid()'));

    cognitoUser.deleteUser(unregisterCallBack);

    LocalStorage.removeItem('currSession');
    LocalStorage.removeItem('awsCredentials');
    LocalStorage.setItem('isLoggedIn', false);
}

function getCurrentUser() {
    const userPool = new CognitoUserPool({
        UserPoolId: awsmobile.aws_user_pools_id,
        ClientId: awsmobile.aws_user_pools_web_client_id
    });

    return userPool.getCurrentUser();
}

function getUserAttributes(getUserAttributesCallBack) {
    const cognitoUser = getCurrentUser();
    cognitoUser.getSession((e, s) => console.log(e || 'session acquired = session.isValid()'));

    cognitoUser.getUserAttributes(getUserAttributesCallBack);
}

function updateUserAttributes(updateUserAttributesCallBack, ...attributes) {
    const cognitoUser = getCurrentUser();
    cognitoUser.getSession((e, s) => console.log(e || 'session acquired = session.isValid()'));

    let attributeList = [];
    attributes.forEach(function (attribute) {
        attributeList.push(new CognitoUserAttribute(attribute));
    });

    cognitoUser.updateAttributes(attributeList, updateUserAttributesCallBack);
}

const getCredentials = async function getCredentials(session) {
    LocalStorage.setItem('currSession', JSON.stringify(session));
    await setCredentials(getCognitoCredentials(session));

    LocalStorage.setItem('isLoggedIn', true);
};

const getCognitoCredentials = function getCognitoCredentials(session) {
    const loginCred = `cognito-idp.${awsmobile.aws_project_region}.amazonaws.com/${awsmobile.aws_user_pools_id}`;

    const cognitoParams = {
        IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
        Logins: {
            [loginCred]: session.getIdToken().getJwtToken(),
        },
    };

    return new AWS.CognitoIdentityCredentials(cognitoParams);
};

const setCredentials = function setCredentials(credentials) {
    return new Promise((resolve, reject) => {
        AWS.config.update({region: awsmobile.aws_project_region});
        AWS.config.credentials = credentials;

        AWS.config.credentials.refresh((error) => {
            if (error) {
                reject(error);
                return;
            }

            const {accessKeyId, secretAccessKey, sessionToken} = AWS.config.credentials;
            const awsCredentials = {
                accessKeyId,
                secretAccessKey,
                sessionToken,
            };
            LocalStorage.setItem('awsCredentials', JSON.stringify(awsCredentials));

            resolve(awsCredentials);
        });
    });
};

function isSignedIn() {
    return !!LocalStorage.getItem('isLoggedIn');
}

function check(error) {
    const err = error.toString();
    if (/InvalidParameterException: Missing required parameter USERNAME$/.test(err)
            || (/Attributes did not conform to the schema: (email|password): The attribute is required?/.test(err))
        || (/UserNotFoundException?/.test(err))
        || (/NotAuthorizedException?/.test(err))) {
        return {
            invalidCredentialsMessage: 'Please enter valid email and password.',
        }
    } else if (/User already exists$/.test(err)) {
        return {
            invalidCredentialsMessage: 'User already exists',
        }
    }  else if (/Incorrect username or password.$/.test(err)) {
        return {
            invalidCredentialsMessage: 'Incorrect username or password',
        }
    }   else if (/Password attempts exceeded$/.test(err)) {
        return {
            invalidCredentialsMessage: 'Password attempts exceeded',
        }
    } else if (/CodeMismatchException: Invalid code or auth state for the user.$/.test(err)) {
        return {
            invalidCredentialsMessage: 'Invalid Verification Code',
        }
    } else if (/InvalidParameterException: Missing required parameter SMS_MFA_CODE$/.test(err)) {
        return {
            invalidCredentialsMessage: 'Verficiation code can not be empty',
        }
    } else if (/PasswordResetRequiredException: Password reset required for the user$/.test(err)) {
        return {
            invalidCredentialsMessage: 'Password reset required for the user',
        }
    }

    console.warn(error);
    return {
        invalidCredentialsMessage: 'There was a problem',
    };
}

export {
    check, getCredentials, getUserAttributes, handleForgotPassword, handleForgotPasswordReset,
    handleNewCustomerRegistration, handleSignIn, handleSignOut, handleUnregisterCustomer, isSignedIn,
    updateUserAttributes
}