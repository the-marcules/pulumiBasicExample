import * as aws from "@pulumi/aws";

import * as pulumi from '@pulumi/pulumi';

export default (vpcId: pulumi.Output<string>, prefix: string) => {
    const sg = new aws.ec2.SecurityGroup(prefix+"-sg", {
        vpcId: vpcId,
    })
    return sg
}
