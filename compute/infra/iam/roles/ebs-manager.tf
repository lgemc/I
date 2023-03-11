data "aws_iam_policy_document" "instance_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "ebs_manager" {
  name               = "ebs-manager"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.instance_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "manager_attachment" {
  role       = aws_iam_role.ebs_manager.name
  policy_arn = var.ebs_manager_policy_arn
}

output "ebs_manager_role_name" {
  value = aws_iam_role.ebs_manager.name
}
