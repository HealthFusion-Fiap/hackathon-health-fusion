PROJECT=hackathon-health-fusion

build-image:
	docker-compose build

up:
	WATCH_MODE=0 docker-compose up -d

down:
	docker-compose down

watch:
	WATCH_MODE=1 docker-compose up -d

logs:
	docker-compose logs --tail=10 -f

build:
	docker-compose run -w /app $(PROJECT) bash -c "npm install && npm run build"

login:
	docker-compose run -w /app $(PROJECT) /bin/bash
