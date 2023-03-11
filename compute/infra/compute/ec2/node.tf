resource "aws_instance" "main_node" {
  ami = "ami-0aae12f4d7200e812"

  instance_type = "t3a.small"

  key_name = "lgmc"

  iam_instance_profile = var.main_instance_profile_name
  network_interface {
    network_interface_id = var.main_network_interface_id
    device_index         = 0
  }
  tags = {
    "Service" = "main"
    "Name"    = "main_node"
  }
}

output "main_node_ip" {
  value = aws_instance.main_node.id
}
