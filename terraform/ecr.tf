resource "aws_ecr_repository" "health_fusion_service_ecr" {
  name = var.ecr_name

  image_tag_mutability = "MUTABLE"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = false
  }
}