'use strict';

module.exports = {
    basicAuthorizer: async function(event, ctx, cb) {
        if (event['type'] !== 'TOKEN') {
            cb('Unauthorized');
        }

        try {
            const authorizationToken = event.authorizationToken;

            const encodedCreds = authorizationToken.split(' ')[1];
            const buff = Buffer.from(encodedCreds, 'base64');
            const plainCreds = buff.toString('utf-8').split('=');
            const username = plainCreds[0];
            const password = plainCreds[1];

            const storedPassword = process.env[username];
            const effect = !storedPassword || storedPassword != password ? 'Deny' : 'Allow';

            const policy = generatePolicy(encodedCreds, event.methodArn, effect);

            cb(null, policy);
            
        } catch (error) {
            cb(`Unauthorized ${error.message}`);
        }
    }
}

const generatePolicy = (principalId, resource, effect) => {
    return {
        "principalId": principalId,
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": effect,
                "Resource": resource
            }
            ]
        }
    }
}