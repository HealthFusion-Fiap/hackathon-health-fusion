variable "region" {
  description = "The region where resources will be created and state will be stored"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  default = "terraform-state-fiap-group-18" //TODO: create your S3 manually in aws
}

variable "ec2_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

variable "ecs_auto_scale_role_name" {
  description = "ECS auto scale role name"
  default     = "myEcsAutoScaleRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

//Sugestão: deixar vazio e deixar dar erro a primeira vez que o ECS subir, para obrigar a dar start no GA e subir imagem atualizada
variable "app_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "211125364272.dkr.ecr.us-east-1.amazonaws.com/health-fusion-ecr:c3db471"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 3000

}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 2
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "1024"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "2048"
}
