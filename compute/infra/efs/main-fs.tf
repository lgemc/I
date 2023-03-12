resource "aws_efs_file_system" "main_efs" {
  creation_token = "main-efs"

  tags = {
    Name = "main-efs"
  }
}

output "main_efs_file_system_id" {
  value = aws_efs_file_system.main_efs.id
}
