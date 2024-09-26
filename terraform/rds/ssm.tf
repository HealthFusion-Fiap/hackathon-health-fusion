resource "aws_ssm_parameter" "rw_db_host" {
  name  = "/${var.health_fusion_service_name}/db_host"
  value = aws_db_instance.health_fusion_db.address
  type  = "String"
}

resource "aws_ssm_parameter" "rw_db_name" {
  name  = "/${var.health_fusion_service_name}/db_name"
  value = aws_db_instance.health_fusion_db.db_name
  type  = "String"
}

resource "aws_ssm_parameter" "rw_db_username" {
  name  = "/${var.health_fusion_service_name}/db_username"
  value = aws_db_instance.health_fusion_db.username
  type  = "String"
}

resource "aws_ssm_parameter" "rw_db_password" {
  name  = "/${var.health_fusion_service_name}/db_password"
  value = aws_db_instance.health_fusion_db.password
  type  = "SecureString" # Important to store the password securely in SSM
}
