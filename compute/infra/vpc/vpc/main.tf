resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/24"

  tags = {
    "Service" = "main"
    "Name"    = "main_vpc"
  }
}

output "main_vpc_id" {
  value = aws_vpc.main_vpc.id
}
