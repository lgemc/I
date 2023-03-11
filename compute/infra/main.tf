provider "aws" {
  region = "us-east-1"
}

module "compute" {
  source = "./compute"

  main_network_interface_id = module.vpc.main_network_interface_id
  main_vpc_id               = module.vpc.main_vpc_id
}

module "iam" {
  source = "./iam"
}

module "vpc" {
  source                 = "./vpc"
  main_security_group_id = module.compute.main_security_group_id
}

output "main_eip_address" {
  value = module.compute.main_eip_address
}
