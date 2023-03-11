module "ec2" {
  source                     = "./ec2"
  main_network_interface_id  = var.main_network_interface_id
  main_instance_profile_name = var.main_instance_profile_name
  main_security_group_id     = module.security_groups.main_security_group_id
}

module "security_groups" {
  source = "./security-groups"

  main_vpc_id = var.main_vpc_id
}

module "eip" {
  source = "./eip"

  main_node_id = module.ec2.main_node_ip
}

output "main_eip_address" {
  value = module.eip.main_eip_address
}

output "main_security_group_id" {
  value = module.security_groups.main_security_group_id
}
