# Criação de um grupo de sub-redes para o banco de dados
resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = [local.aws_public_subnet_id, local.aws_private_subnet_id]

  tags = {
    Name = "Main DB Subnet Group"
  }
}

# Definição da política de segurança para a sub-rede pública
resource "aws_security_group" "rds_public_sg" {
  name        = "rds_public_sg"
  description = "Allow postgres inbound traffic"
  vpc_id      = local.aws_vpc_id

  # Permitir tráfego de entrada apenas nas portas necessárias
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}