PROJECT=health-fusion

build-image:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs --tail=10 -f

login:
	docker-compose run -w /app $(PROJECT) /bin/bash
