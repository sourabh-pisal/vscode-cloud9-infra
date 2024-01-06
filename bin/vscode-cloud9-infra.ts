#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { VscodeCloud9InfraStack } from '../lib/vscode-cloud9-infra-stack'

const app = new cdk.App()
const infra = new VscodeCloud9InfraStack(app, 'VscodeCloud9InfraStack', { env: { region: 'eu-west-1' } })
cdk.Tags.of(infra).add('Project', 'vscode-cloud9')
