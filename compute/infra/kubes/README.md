# Helm

It is a repo manager

Some times you want download code to your code base, sometimes not

If you want download code and add it to your code base execute

```bash
helm fetch aws-ebs-csi-driver/aws-ebs-csi-driver --untar
```

It will create a folder called `aws-ebs-scs-driver`

To install execute

```bash
helm install aws-ebs-csi-driver aws-ebs-csi-driver
```

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

# About PVC (Persistent Volume Claims) and PV (Persisten Volumes)

A claim can exists without a volume definition

Persisten volume claims can be configured to only claims when are binded.

# About postgres

When a volume is used, you should pass a custom folder to get data sotored

Supposing you have a volume claims called `my-volume`, you should configure the
mount point at `/var/postgresql/data` and `PG_DATA` var at `/var/postgresql/data/my-postgres`,
because postgres did't allow have `/var/postgersql/data` folder as a direct mount point

# About secrets caveats

When you are generating secrets with base64 encoded commands, you should run
`echo -n your-value-here | base64` instead `echo your-value-here | base64` because
by default echo adds a break line (`\n`), `-n` argument prevents it.

For more information common related issues see [this link](https://stackoverflow.com/questions/49155199/debugging-an-unnecessary-newline-character-in-a-kubernetes-secret).

# About dangers of have database and server in same pod

When pod is starting, race conditions can be broke pod behavior, if back start before
database server it will fail when it try to connect to server

# About log volume

Pods starts and ends, its data is ephemereal, you should centralize that in a shared
file storage to prevent deletions
