resource "aws_iam_instance_profile" "aimo_service" {
  name = "ebs-manager"
  role = var.ebs_manager_role_name
}
