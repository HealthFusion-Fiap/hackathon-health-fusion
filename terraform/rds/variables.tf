variable "region" {
  description = "The region where resources will be created and state will be stored"
  default     = "us-east-1"
}

variable "db_instance_class" {
  description = "The instance class for the RDS instance"
  default     = "db.t3.micro"
}

variable "s3_bucket_name" {
  default = "terraform-state-fiap-group-18" //TODO: create your S3 manually in aws
}

//DB
variable "rw_db_password" {
  description = "Password for the database"
  default     = ""
}

variable "rw_db_name" {
  description = "The name of the database"
  default     = "postgres"
}

variable "rw_db_username" {
  description = "The username for the database"
  default     = "postgres"
}

variable "health_fusion_service_name" {
  description = "The name of the project"
  default     = "health-fusion-service"
}
