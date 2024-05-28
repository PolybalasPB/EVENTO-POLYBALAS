
# Feedback do Evento - Documentação

Este repositório contém um sistema de feedback de evento que permite aos participantes fornecerem insights e avaliações sobre o evento. O projeto consiste em vários arquivos, cada um desempenhando um papel específico no funcionamento do sistema.

## Arquivos e Funcionalidades:

### HTML (`index.html`)

- **Propósito:** Este arquivo HTML define a estrutura do formulário de feedback do evento.
- **Funcionalidades:**
  - Formulário de feedback: Os participantes podem inserir insights, sugestões de melhorias, feedback sobre o evento e outras informações relevantes.
  - Modal de login: Um modal de login é fornecido para administradores acessarem recursos adicionais.
  - Botão de download: Após o login, os administradores podem baixar os feedbacks em formato Excel.

### CSS (`styles.css`)

- **Propósito:** O arquivo CSS fornece estilos para a página HTML, garantindo uma apresentação visualmente atraente e consistente.
- **Funcionalidades:**
  - Estilização: Define o layout, cores, fontes e outros estilos visuais para os elementos da página, incluindo o formulário de feedback, botões e modais.

### JavaScript (`script.js`)

- **Propósito:** Este arquivo JavaScript adiciona interatividade ao formulário de feedback e controla as operações do lado do cliente.
- **Funcionalidades:**
  - Envio de feedback: Captura os dados do formulário e os envia para o servidor via AJAX.
  - Exibição de mensagens: Exibe mensagens de sucesso após o envio do feedback.
  - Autenticação de administrador: Controla o modal de login e valida as credenciais de administrador.
  - Download de feedbacks: Permite que administradores baixem os feedbacks em formato Excel.

### Servidor Node.js (`server.js`)

- **Propósito:** Este arquivo implementa um servidor Node.js usando o framework Express para lidar com as solicitações HTTP e persistir os dados dos feedbacks.
- **Funcionalidades:**
  - Endpoints HTTP: Fornece endpoints para enviar feedbacks (`/submit-feedback`) e obter feedbacks (`/get-feedbacks`).
  - Banco de dados SQLite: Utiliza um banco de dados SQLite para armazenar os feedbacks dos participantes de forma persistente.

## Configuração do Ambiente:

1. **Instalação de Dependências:** Execute `npm install` para instalar as dependências do projeto.
2. **Inicialização do Servidor:** Inicie o servidor Node.js executando `node server.js`.
3. **Acesso ao Formulário:** Abra o arquivo `index.html` em um navegador da web para acessar o formulário de feedback.

## Notas Adicionais:

- **Autenticação de Administrador:** O acesso ao recurso de download de feedbacks é restrito a administradores, com as credenciais padrão sendo `1234` tanto para o nome de usuário quanto para a senha.
- **Segurança:** Este projeto é fornecido apenas como exemplo educacional e pode precisar de melhorias de segurança para uso em produção.

---

Por favor, revise a documentação e ajuste conforme necessário para atender às necessidades específicas do seu projeto e público-alvo.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
