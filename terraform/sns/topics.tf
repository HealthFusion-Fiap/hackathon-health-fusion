resource "aws_sns_topic" "payment_success" {
  name = "payment-success-topic"
}

resource "aws_sns_topic" "payment_failure" {
  name = "payment-failure-topic"
}