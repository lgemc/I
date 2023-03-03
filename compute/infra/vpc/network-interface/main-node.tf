resource "aws_network_interface" "main_node_interface" {
  subnet_id = var.main_subnet_id

  private_ips = ["10.0.0.79"]

  tags = {
    "Service" = "main"
    Name      = "main_node_interface"
  }
}

output "main_node_interface_id" {
  value = aws_network_interface.main_node_interface.id
}
