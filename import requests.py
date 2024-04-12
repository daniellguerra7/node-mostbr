import requests

def make_request():
    # URL do servidor proxy
    proxy_url = 'https://sts.itau.com.br/api/oauth/token'

    # Cabeçalhos da requisição
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-itau-flowID': '1',
        'x-itau-correlationID': '2'
    }

    # Corpo da requisição (form url encoded)
    data = {
        'grant_type': 'client_credentials',
        'client_id': 'd3b70073-bc17-45b5-ba3e-d1de714aee64',
        'client_secret': 'fffd86a5-140d-4651-866b-c2cf67f71a2f'
    }

    # Realiza a requisição utilizando o servidor proxy
    response = requests.post(proxy_url, headers=headers, data=data, cert=('C:/KeysItau/Certificado_itau.crt', 'C:/KeysItau/NOVO_CERTIFICADO.key'))

    # Exibe o resultado da requisição
    print(response.status_code)
    print(response.text)

if __name__ == "__main__":
    make_request()