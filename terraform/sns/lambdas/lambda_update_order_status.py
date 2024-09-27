import json
import urllib3

def lambda_handler(event, context):

    message = event['Records'][0]['Sns']['Message']
    print(message)

    #TODO: é preciso mudar a url com o DNS do LB do order-service
    orderServiceAddress = "http://a6945c02e6bf44ba0b2f32721ea971bb-1914662718.us-east-1.elb.amazonaws.com/orders"
    
    http = urllib3.PoolManager()
    response = http.request('PATCH', orderServiceAddress, body = message, headers = {'Content-Type': 'application/json'}, retries = False)
    

    return {
        'statusCode': 200,
    }
