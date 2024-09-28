[
  {
    "name": "health-fusion-app",
    "image": "${app_image}",
    "environment": [
      {
        "name": "JWT_SECRET",
        "value": "secret"
      },
      {
        "name": "DATABASE_URL",
        "value": "${database_url}"
      },
      {
        "name": "MJ_APIKEY_PUBLIC",
        "value": "${mj_public_key}"
      },
      {
        "name": "MJ_APIKEY_PRIVATE",
        "value": "${mj_private_key}"
      },
      {
        "name": "MJ_MAIL_SENDER",
        "value": "${mj_sender}"
      }
    ],
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/health-fusion-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ]
  }
]