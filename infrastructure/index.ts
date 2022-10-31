import  newSg  from "./modules/securityGroup";
import {Vpc} from "./modules/vpc"
import { S3Bucket, PutFileIntoBucket } from "./modules/bucket";
import {CreateLambda} from "./modules/lambda";
import {createApiGateway} from "./modules/apiGateway";


( async () => {
  const initConfig = {
  bucketName: 'demo-app-bucket',
  prefix: 'carvedRock',
  lambdaName: 'carvedRockTestLambda'
  };
  const s3Opts = {
  website: {
  indexDocument: "index.html"
  }
  };

  const vpc = Vpc(initConfig.prefix+"-custom-vpc")
  const s3 = S3Bucket(initConfig.bucketName, s3Opts)
  const securityGroup = newSg(vpc.id, initConfig.prefix)

  // @ts-ignore
  PutFileIntoBucket(s3, '../frontend/index.html')

  const lambda = await CreateLambda(initConfig.lambdaName, "../backend/lambda.zip", vpc, securityGroup)

  const apiGateway = await createApiGateway(lambda)

 console.log(apiGateway.url)

})()
