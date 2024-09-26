output "payment_success_topic_arn" {
  description = "ARN of aws sns payment success topic"
  value       = aws_sns_topic.payment_success.arn
}

output "payment_failure_topic_arn" {
  description = "ARN of aws sns payment failure topic"
  value       = aws_sns_topic.payment_failure.arn
}