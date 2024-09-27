OBS.: antes de começar, é necessário criar um S3 manualmente em sua conta AWS. Substitua `terraform-state-fiap-group-18` pelo nome do S3 criado em todos os arquivos necessários.

OBS2.: ainda há harcodeds no código, como a senha e usuário do banco e o link da imagem no ECR

- Lembre-se de trocar os secrets da AWS para rodar o pipe caso mude de conta

APPLY:
- Provisionar primeiro a infra do `network`
- `ecr`, `ecs`, `rds`, e `sns` podem ser provisionados simultaneamente

- Comando para provisionar `rds`: `terraform apply -var="rw_db_password=rootroot"`

DESTROY:
- O comando destroy pode ser executado simultaneamente em `ecs`, `rds`, e `sns`
