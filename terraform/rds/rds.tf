resource "aws_db_instance" "health_fusion_db" {
  allocated_storage    = 20
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "16.2"
  instance_class       = var.db_instance_class
  identifier           = "postgres-health-fusion"
  db_name              = var.rw_db_name
  username             = var.rw_db_username
  password             = var.rw_db_password
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds_public_sg.id] # Just for demonstration purposes
  skip_final_snapshot    = true

  tags = {
    Name = "RDS customer PostgreSQL"
  }
}
