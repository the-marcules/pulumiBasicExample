import * as aws from "@pulumi/aws";
import {FileAsset} from "@pulumi/pulumi/asset";
import {Input, Output} from "@pulumi/pulumi";
import {PolicyDocument} from "@pulumi/aws/iam";


export function S3Bucket(name: string, opts: any) {
    const mykey = new aws.kms.Key("mykey", {
        description: "This key is used to encrypt bucket objects",
        deletionWindowInDays: 10,
    });

    let sseOpts = {
            rule: {
                applyServerSideEncryptionByDefault: {
                    kmsMasterKeyId: mykey.arn,
                    sseAlgorithm: "aws:kms",
                },
            }
    }

    opts.serverSideEncryptionConfiguration=sseOpts
    const bucket = new aws.s3.Bucket(name, opts)
    // @ts-ignore
    new aws.s3.BucketPolicy('bucketPolicy', {
        bucket: bucket.bucket, // refer to the bucket created earlier
        policy: bucket.bucket.apply(publicReadPolicyForBucket), // use output property `siteBucket.bucket`
    });

    return bucket
}


function publicReadPolicyForBucket(bucketName: string): aws.iam.PolicyDocument{

    return {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Principal: {
                    AWS: 'arn:aws:iam::738555143498:root',
                },
                Action: ['s3:GetObject'],
                Resource: [
                    `arn:aws:s3:::${bucketName}/*`, // policy refers to bucket name explicitly
                ],
            },
        ],
    };
}




export function PutFileIntoBucket(buck: aws.s3.Bucket, filePath: string) {

        const asset = new FileAsset(filePath);
        const bucketObject = new aws.s3.BucketObjectv2('index.html', {
            bucket: buck.bucket,
            key: 'index.html',
            source: asset,
        });
}
