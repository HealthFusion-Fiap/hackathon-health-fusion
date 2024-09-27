resource "aws_ecs_cluster" "main" {
  name = "health-fusion-cluster"
}

data "template_file" "health_fusion_app" {
  template = file("./templates/ecs/health_fusion_app.json.tpl")

  vars = {
    app_image      = var.app_image
    app_port       = var.app_port
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.region
    database_url   = "postgresql://postgres:rootroot@postgres-customer.c9emy44wan4g.us-east-1.rds.amazonaws.com:5432/health_fusion?schema=public"
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "health-fusion-app-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.health_fusion_app.rendered
}

resource "aws_ecs_service" "main" {
  name            = "health-fusion-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = [local.aws_public_subnet_id, local.aws_private_subnet_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name   = "health-fusion-app"
    container_port   = var.app_port
  }
}
