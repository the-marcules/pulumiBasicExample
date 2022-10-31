import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import {iamForLambda} from "./iamForLambda";


export async function CreateLambda(lambdaName:string, artifact: string, vpc: awsx.ec2.Vpc, sg:  aws.ec2.SecurityGroup): Promise<aws.lambda.Function> {
    const pSubNet = await vpc.privateSubnetIds

    return new aws.lambda.Function(lambdaName, {
        vpcConfig: {
            subnetIds: [ ...pSubNet ],
            securityGroupIds: [sg.id]
        },
        code: new pulumi.asset.FileArchive('../backend/build/lambda.zip'),
        role: iamForLambda.arn,
        handler: 'index.handler',
        runtime: 'nodejs14.x',
        environment: {
            variables: {
                foo: 'bar',
            },
        },
    });

}