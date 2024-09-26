resource "aws_iam_policy" "function_logging_policy" {
  name   = "function-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_update_order_status_logging_policy_attachment" {
  role = aws_iam_role.lambda_role.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}

resource "aws_cloudwatch_log_group" "lambda_update_order_status_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_update_order_status.function_name}"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_log_group" "lambda_client_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_client.function_name}"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_log_group" "lambda_kitchen_status_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_kitchen.function_name}"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
}