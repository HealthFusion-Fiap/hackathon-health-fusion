def lambda_handler(event, context):
    message = event['Records'][0]['Sns']['Message']
    print("Hello from the client!")
    print(message)
    return {
        'statusCode': 200,
    }
