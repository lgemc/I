provider "aws" {
  region = "us-east-1"
}

module "compute" {
  source = "./compute"

  mmain_network_interface_id = module.vpc.main_network_interface_id
}

module "vpc" {
  source = "./vpc"
}
