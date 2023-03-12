provider "aws" {
  region = "us-east-1"
}

module "compute" {
  source = "./compute"

  main_network_interface_id  = module.vpc.main_network_interface_id
  main_instance_profile_name = module.iam.main_instance_profile_name
  main_vpc_id                = module.vpc.main_vpc_id
}

module "iam" {
  source = "./iam"
}

module "keys" {
  source = "./keys"
}

module "vpc" {
  source                 = "./vpc"
  main_security_group_id = module.compute.main_security_group_id
}

module "efs" {
  source                 = "./efs"
  main_security_group_id = module.compute.main_security_group_id
  main_subnet_id         = module.vpc.main_subnet_id
}

output "main_eip_address" {
  value = module.compute.main_eip_address
}

output "main_efs_file_system_id" {
  value = module.efs.main_efs_file_system_id
}
