resource "aws_subnet" "main_subnet" {
  vpc_id            = var.main_vpc_id
  cidr_block        = "10.0.0.0/28"
  availability_zone = "us-east-1b"
  tags = {
    "Name"    = "main_subnet"
    "Service" = "main"
  }
}

output "main_subnet_id" {
  value = aws_subnet.main_subnet.id
}
