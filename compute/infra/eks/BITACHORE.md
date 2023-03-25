# Eks

Elastic kubernetes service by AWS.

## Getting started

See [this link](https://aws.amazon.com/getting-started/hands-on/deploy-kubernetes-app-amazon-eks/)

## Concepts

kubectl
eksctl
AWS Cli
terraform

## Eks ctl

Under the hood it uses cloud formation stack where creates next elements

- Control plane
- Security group
- Pod execution role
- Ingress node groups
- Internet gateway
- NAT gateway
- Nat ip 
Policy cloudwatch metric
- Elb permisoin
- Routetable
- Subnet route
- Roles
- VPC
- VPCGateway attachment
