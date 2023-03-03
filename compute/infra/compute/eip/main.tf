resource "aws_eip" "main_eip" {
  instance = var.main_node_id
  vpc      = true

  tags = {
    "Service" = "main"
    "Name"    = "main_eip"
  }
}
