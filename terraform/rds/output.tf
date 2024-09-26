output "rds_public_sg_id" {
  description = "RDS public security group ID"
  value       = aws_security_group.rds_public_sg.id
}

output "customer_db_instance_endpoint" {
  description = "The connection to healthfusion db endpoint"
  value       = aws_db_instance.customer_db.endpoint
}