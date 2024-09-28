OBS.: antes de começar, é necessário criar um S3 manualmente em sua conta AWS. Substitua `terraform-state-fiap-group-18` pelo nome do S3 criado em todos os arquivos necessários.

- Lembre-se de trocar os secrets da AWS para rodar o pipe caso mude de conta

APPLY:
- Provisionar primeiro a infra do `network`
- `ecr`, `ecs`, `rds`, e podem ser provisionados simultaneamente

- Comando para provisionar `rds`: `terraform apply -var="rw_db_password=rootroot"`
  
- Comando para provisionar o `ecs`: terraform apply -var="mj_public_key=PUBLIC_KEY_FROM_MAIL_JET" -var="mj_private_key=PRIVATE_KEY_FROM_MAIL_JET" -var="mj_sender=MOCK_EMAIL"

DESTROY:
- O comando destroy pode ser executado simultaneamente em `ecs`, `rds`, e `sns`
