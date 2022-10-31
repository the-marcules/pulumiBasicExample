import * as awsx from "@pulumi/awsx";

export function Vpc(name: string) {

    return new awsx.ec2.Vpc(name, {
        cidrBlock: "172.16.8.0/24",
        numberOfNatGateways: 0,
        numberOfAvailabilityZones:1,
        tags: {
            "deleteMe":"true",
            "correspondingApp": "carvedRock"
        }

    })
}
