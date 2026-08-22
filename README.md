# Chat2 - ChatGPT Integration

Aplicação de chat integrada com ChatGPT.

## 🚀 Configuração

### 1. Instale as dependências
```bash
pip install -r requirements.txt
```

### 2. Configure sua API Key do OpenAI
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API do OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
```

### 3. Como obter sua API Key
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Faça login ou crie uma conta
3. Vá para [API keys](https://platform.openai.com/api/keys)
4. Clique em "Create new secret key"
5. Copie a chave e cole em seu arquivo `.env`

## 📝 Uso

### Exemplo básico
```python
from chatgpt_connector import ChatGPTConnector

chat = ChatGPTConnector()
resposta = chat.send_message("Olá, como você está?")
print(resposta)
```

### Exemplo com prompt do sistema
```python
from chatgpt_connector import ChatGPTConnector

chat = ChatGPTConnector()
resposta = chat.send_message(
    message="Qual é a capital da França?",
    system_prompt="Você é um assistente educacional muito útil."
)
print(resposta)
```

### Exemplo de conversa
```python
from chatgpt_connector import ChatGPTConnector

chat = ChatGPTConnector()
messages = [
    {"role": "user", "content": "Olá!"},
    {"role": "assistant", "content": "Olá! Como posso ajudá-lo?"},
    {"role": "user", "content": "Qual é 2+2?"}
]
resposta = chat.chat_conversation(messages)
print(resposta)
```

## ⚙️ Variáveis de Ambiente
- `OPENAI_API_KEY`: Sua chave de API do OpenAI (obrigatório)

## 📚 Documentação
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Python OpenAI Library](https://github.com/openai/openai-python)

## ⚠️ Importante
- Nunca compartilhe sua chave de API
- Mantenha a chave segura em variáveis de ambiente
- Monitore seu uso da API para evitar cobranças inesperadas
