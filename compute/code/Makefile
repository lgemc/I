back.build:
	npm run cli -- back build

back.services.start:
	docker-compose -f ./infra/docker-compose.yaml up -d

back.start: back.build back.services.start
	cp ./node_modules/@dqbd/tiktoken/tiktoken_bg.wasm dist/api
	npm run  cli -- back serve

init:
	npm install

front.start:
	npm run cli -- front serve