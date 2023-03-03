module "vpc" {
  source = "./vpc"
}

module "subnet" {
  source      = "./subnet"
  main_vpc_id = module.vpc.main_vpc_id
}

module "network_interface" {
  source         = "./network-interface"
  main_subnet_id = module.subnet.main_subnet_id
}

output "main_vpc_id" {
  value = module.vpc.main_vpc_id
}

output "main_network_interface_id" {
  value = module.network_interface.main_node_interface_id
}
