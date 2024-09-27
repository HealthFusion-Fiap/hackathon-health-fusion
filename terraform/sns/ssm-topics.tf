resource "aws_ssm_parameter" "payment_success_topic_arn" {
  name  = "/payment_success_topic_arn"
  value = aws_sns_topic.payment_success.arn
  type  = "String"
}

resource "aws_ssm_parameter" "payment_failure_topic_arn" {
  name  = "/payment_failure_topic_arn"
  value = aws_sns_topic.payment_failure.arn
  type  = "String"
}