module "ec2" {
  source                    = "./ec2"
  main_network_interface_id = var.main_network_interface_id
}

module "eip" {
  source = "./eip"

  main_node_id = module.ec2.main_node_ip
}
