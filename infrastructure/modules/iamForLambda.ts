import * as aws from "@pulumi/aws";

const accountId = "738555143498"

const createNetworkInterface = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "fromPulumi",
            "Effect": "Allow",
            "Action": "ec2:CreateNetworkInterface",
            "Resource": [
                "arn:aws:ec2:eu-west-1:"+accountId+":network-interface/*",
                "arn:aws:ec2:eu-west-1:"+accountId+":security-group/*",
                "arn:aws:ec2:eu-west-1:"+accountId+":subnet/*"
            ]
        }
    ]
}
const deleteNetworkInterface = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "fromPulumi",
            "Effect": "Allow",
            "Action": "ec2:DeleteNetworkInterface",
            "Resource": "arn:aws:ec2:eu-west-1:"+accountId+":network-interface/*"
        }
    ]
}
const describeNetworkInterface = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "fromPulumi",
            "Effect": "Allow",
            "Action": "ec2:DescribeNetworkInterfaces",
            "Resource": "*"
        }
    ]
}



export const iamForLambda = new aws.iam.Role('iamForLambda-carvedRock', {
    assumeRolePolicy: `{
                          "Version": "2012-10-17",
                          "Statement": [
                            {
                              "Action": "sts:AssumeRole",
                              "Principal": {
                               
                                 "Service": "lambda.amazonaws.com"
                              },
                              "Effect": "Allow",
                              "Sid": ""
                            }
                          ]
                        }`,
    managedPolicyArns: [
        "arn:aws:iam::aws:policy/AWSLambdaExecute",
        "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess",
        "arn:aws:iam::aws:policy/job-function/NetworkAdministrator"

    ],
    inlinePolicies: [
      /*  {
            name: "createNetworkInterface",
            policy: JSON.stringify(createNetworkInterface)
        },
        {
            name: "deleteNetworkInterface",
            policy: JSON.stringify(deleteNetworkInterface)
        },
        {
            name: "describeNetworkInterface",
            policy: JSON.stringify(describeNetworkInterface)
        }*/
    ]

});
