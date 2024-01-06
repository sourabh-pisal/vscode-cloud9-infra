import { Stack, type StackProps } from 'aws-cdk-lib'
import { CfnEnvironmentEC2 } from 'aws-cdk-lib/aws-cloud9'
import { IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2'
import { type Construct } from 'constructs'

export class VscodeCloud9InfraStack extends Stack {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    const vpc = new Vpc(this, 'vpc', {
      ipAddresses: IpAddresses.cidr('10.0.0.0/27'),
      natGateways: 0,
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: 'private-subnet',
          subnetType: SubnetType.PUBLIC
        }
      ]
    })

    new CfnEnvironmentEC2(this, 'Ec2Env', {
      imageId: 'amazonlinux-2023-x86_64',
      instanceType: 't3.xlarge',
      automaticStopTimeMinutes: 5,
      connectionType: 'CONNECT_SSM',
      description: 'Cloud9 instance for use with VS Code Remote SSH',
      name: 'Vs Code Remote SSH',
      subnetId: vpc.publicSubnets[0].subnetId
    })
  }
}
