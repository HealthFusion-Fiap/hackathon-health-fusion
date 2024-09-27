resource "aws_lambda_function" "lambda_update_order_status" {
  filename      = "lambdas/lambda_update_order_status.zip"
  source_code_hash = filebase64("lambdas/lambda_update_order_status.zip")
  function_name = "lambda-update-order-status"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_update_order_status.lambda_handler"
  runtime       = "python3.12"
  timeout       = 5
  memory_size   = 128
}

resource "aws_lambda_function" "lambda_client" {
  filename      = "lambdas/lambda_client.zip"
  source_code_hash = filebase64("lambdas/lambda_client.zip")
  function_name = "lambda-client"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_client.lambda_handler"
  runtime       = "python3.12"
  timeout       = 5
  memory_size   = 128
}

resource "aws_lambda_function" "lambda_kitchen" {
  filename      = "lambdas/lambda_kitchen.zip"
  source_code_hash = filebase64("lambdas/lambda_kitchen.zip")
  function_name = "lambda-kitchen"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_kitchen.lambda_handler"
  runtime       = "python3.12"
  timeout       = 5
  memory_size   = 128
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = [
        "sts:AssumeRole"
      ],
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Effect = "Allow"
    }]
  })
}