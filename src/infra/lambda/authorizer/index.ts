import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

// Função para gerar a política de autorização
const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string,
): APIGatewayAuthorizerResult => {
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  };

  return {
    principalId,
    policyDocument,
  };
};

// Função para extrair a rota a partir do methodArn
const getRouteFromMethodArn = (methodArn: string): string => {
  // Exemplo de methodArn: arn:aws:execute-api:us-east-1:123456789012:example/prod/POST/schedules
  const arnParts = methodArn.split(':');
  const apiGatewayArnPart = arnParts[5]; // Pega a parte que contém a rota e o método HTTP
  const route = apiGatewayArnPart.split('/')[3];

  return route;
};

// Funções de validação para diferentes rotas
const validateTokenForSchedules = (token: string): void => {
  if (token !== 'valid-token-schedules') {
    throw new Error('Token inválido para /schedules');
  }
};

const validateTokenForPatients = (token: string): void => {
  if (token !== 'valid-token-patients') {
    throw new Error('Token inválido para /patients');
  }
};

// eslint-disable-next-line max-len
export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken; // O token enviado pelo cliente
  const { methodArn } = event;
  const route = getRouteFromMethodArn(methodArn); // Extrai a rota a partir do ARN

  try {
    // Decidir o tipo de autenticação com base na rota
    if (route === 'schedules') {
      validateTokenForSchedules(token); // Validação para /schedules
    } else if (route === 'patients') {
      validateTokenForPatients(token); // Validação para /patients
    } else {
      throw new Error('Rota não autorizada');
    }

    // Se a validação passar, retornar a política de autorização
    const principalId = 'user-id'; // Aqui você definiria o ID do usuário validado
    const policyDocument = generatePolicy(principalId, 'Allow', methodArn);

    return policyDocument;
  } catch (error) {
    // Se a validação falhar, negar o acesso
    return generatePolicy('user', 'Deny', methodArn);
  }
};
