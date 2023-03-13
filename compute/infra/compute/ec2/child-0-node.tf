resource "aws_instance" "child_0_node" {
  ami = "ami-0aae12f4d7200e812"

  instance_type = "t3a.small"

  key_name = "lgmc"

  root_block_device {
    delete_on_termination = false
    volume_size           = 20
    volume_type           = "standard"
  }

  iam_instance_profile = var.main_instance_profile_name
  network_interface {
    network_interface_id = var.child_0_network_interface_id
    device_index         = 0
  }
  tags = {
    "Service" = "main"
    "Name"    = "child_0_node"
  }
}
