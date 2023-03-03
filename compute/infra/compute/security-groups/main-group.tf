resource "aws_security_group" "main_security_group" {
  name        = "main-sg"
  vpc_id      = var.main_vpc_id
  description = "Main security group"
  ingress {
    description      = "Allow ssh"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

output "main_security_group_id" {
  value = aws_security_group.main_security_group.id
}
