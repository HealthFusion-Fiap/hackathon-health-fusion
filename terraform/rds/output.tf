output "rds_public_sg_id" {
  description = "RDS public security group ID"
  value       = aws_security_group.rds_public_sg.id
}

output "health_fusion_db_instance_endpoint" {
  description = "The connection to health-fusion db endpoint"
  value       = aws_db_instance.health_fusion_db.endpoint
}

output "health_fusion_db_rw_db_username" {
  description = "RW db username"
  value       = var.rw_db_username
}

output "health_fusion_db_rw_db_password" {
  description = "RW db password"
  value       = var.rw_db_password
}
