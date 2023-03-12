resource "tls_private_key" "efs_key" {
  algorithm = "RSA"
}

resource "aws_key_pair" "efs_key" {
  key_name   = "efs"
  public_key = tls_private_key.efs_key.public_key_openssh
}
