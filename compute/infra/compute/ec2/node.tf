resource "aws_instance" "main_node" {
  ami = "ami-05ece8915d9fcfc2b"

  instance_type = "a1.medium"

  key_name = "lgmc"

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
