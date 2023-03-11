# Troubleshooting

- To see pod logs execute `kubectl logs {{pod-name}}`
- To forward dashboard to localhost execute `kubectl proxy`
- To obtain a valid token to get logged on dashboard see [next link]([https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)

# Aws EBS driver

In order to get volumes managed by elastic block storage you should setup your cluster
to get permissions to perform operations on eks and install on your cluster aws storage class
and Container Storage Interface (CSI) to manage it.

For more information see AWS oficial documentation at [next link](https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/docs/install.md)

Permissions needed by your cluster are as follows

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AttachVolume",
        "ec2:CreateSnapshot",
        "ec2:CreateTags",
        "ec2:CreateVolume",
        "ec2:DeleteSnapshot",
        "ec2:DeleteTags",
        "ec2:DeleteVolume",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeInstances",
        "ec2:DescribeSnapshots",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DescribeVolumesModifications",
        "ec2:DetachVolume",
        "ec2:ModifyVolume"
      ],
      "Resource": "*"
    }
  ]
}
```
