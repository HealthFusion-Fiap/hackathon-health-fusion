// Update order status lambda's config
resource "aws_sns_topic_subscription" "payment_success_triggers_update_order_status" {
  topic_arn = aws_sns_topic.payment_success.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_update_order_status.arn
}

resource "aws_lambda_permission" "payment_success_triggers_update_order_status_permission" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_update_order_status.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.payment_success.arn
}

// Client lambda's config (triggered by payment success)
resource "aws_sns_topic_subscription" "payment_success_triggers_client" {
  topic_arn = aws_sns_topic.payment_success.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_client.arn
}

resource "aws_lambda_permission" "payment_success_triggers_client_permission" {
  statement_id  = "AllowExecutionFromSNSPaymentSuccess"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_client.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.payment_success.arn
}

// Client lambda's config (triggered by payment failure)
resource "aws_sns_topic_subscription" "payment_failure_triggers_client" {
  topic_arn = aws_sns_topic.payment_failure.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_client.arn
}

resource "aws_lambda_permission" "payment_failure_triggers_client_permission" {
  statement_id  = "AllowExecutionFromSNSPaymentFailure"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_client.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.payment_failure.arn
}


// Kitchen lambda's config
resource "aws_sns_topic_subscription" "payment_success_triggers_kitchen" {
  topic_arn = aws_sns_topic.payment_success.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_kitchen.arn
}

resource "aws_lambda_permission" "payment_success_triggers_kitchen_permission" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_kitchen.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.payment_success.arn
}