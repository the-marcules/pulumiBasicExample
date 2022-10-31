import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

export function createApiGateway(lambda: aws.lambda.Function) {
    const api = new apigateway.RestAPI("api", {
        routes: [
            {
                path: "/",
                method: "GET",
                eventHandler: lambda,
            },
        ],
    });
    return api
}