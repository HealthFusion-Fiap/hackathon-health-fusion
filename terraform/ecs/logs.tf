# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "health_fusion_app_log_group" {
  name              = "/ecs/health-fusion-app"
  retention_in_days = 30

  tags = {
    Name = "health-fusion-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "health_fusion_app_log_stream" {
  name           = "health-fusion-log-stream"
  log_group_name = aws_cloudwatch_log_group.health_fusion_app_log_group.name
}