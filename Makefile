API_IMAGE_TAG=blog/tech
API_IMAGE_ECR_RESOURCE=081952199324.dkr.ecr.us-east-1.amazonaws.com/blog/tech

blog.tech.image.push:
	docker push $(API_IMAGE_ECR_RESOURCE):latest

ecr.docker.login:
	aws ecr get-login-password --region us-east-1 --profile i |docker login  --username AWS --password-stdin 081952199324.dkr.ecr.us-east-1.amazonaws.com
blog.tech.image.tag:
	docker tag $(API_IMAGE_TAG):latest $(API_IMAGE_ECR_RESOURCE):latest 

blog.tech.image.build:
	docker buildx build --platform linux/amd64 -f ./compute/containerized/images/blog.tech.docker ./ -t $(API_IMAGE_TAG) --build-arg DIST_FOLDER=dist/blog/tech	

blog.tech.content.build:
	hugo -c blog/tech/content/ -d dist/blog/tech --config blog/tech/config.toml --themesDir blog/tech/themes/

blog.tech.image.publish: blog.tech.content.build blog.tech.image.build blog.tech.image.tag blog.tech.image.push
