data "terraform_remote_state" "network_state" {
  backend = "s3"

  config = {
    bucket = var.s3_bucket_name
    key    = "prod/terraform-network.tfstate"
    region = "us-east-1"
  }
}

data "terraform_remote_state" "rds_state" {
  backend = "s3"

  config = {
    bucket = var.s3_bucket_name
    key    = "prod/terraform-postgres.tfstate"
    region = "us-east-1"
  }
}

locals {
  aws_vpc_id            = data.terraform_remote_state.network_state.outputs.vpc_id
  aws_public_subnet_id  = data.terraform_remote_state.network_state.outputs.public_subnet_id
  aws_public_subnet2_id = data.terraform_remote_state.network_state.outputs.public_subnet2_id
  aws_private_subnet_id = data.terraform_remote_state.network_state.outputs.private_subnet_id
  rw_db_endpoint        = data.terraform_remote_state.rds_state.outputs.health_fusion_db_instance_endpoint
  rw_db_username        = data.terraform_remote_state.rds_state.outputs.health_fusion_db_rw_db_username
  rw_db_password        = data.terraform_remote_state.rds_state.outputs.health_fusion_db_rw_db_password
}
