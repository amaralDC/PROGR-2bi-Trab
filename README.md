# WebApp: Lista de Compras
### [Vídeo / demonstração](https://youtu.be/DNOjo31UIYs)
## Descrição
O projeto realizado é uma aplicação estilo CRUD (create, read, update, and delete) básica, tomando a forma de uma lista de compras possuindo cinco funcionalidades distintas:
 1. **Ler** o registros no banco de dados;
 2. **Adicionar** registros;
 3. **Atualizar** esses registros;
 4. **Excluir** qualquer um registro;
 5. **Pesquisar** por um registro específico.

## Documentação
A tabela *lista* do banco de dados *listacompra* possui as linhas *id, item, dataHora* sendo *id* a chave primária integer com AUTO_INCREMENT, sendo *item* do tipo text(255), e dataHora como datetime. O usuário *admin* possui todas as permissões para a tabela.

O banco de dados *MySQL* foi acessado por *phpMyAdmin* para sua configuração inicial anteriormente de ser conectado diretamente à aplicação por meio de um arquivo *.env* como de seguinte:

> ../server/.env

    PORT=5000
    USER=admin
    PASSWORD=12345
    DATABASE=listacompras
    DB_PORT=3306
    HOST=localhost

### Dependências
Instalados através do package manager *npm* para a linguagem JavaScript:
 - "react-scripts"
 - "cors": "^2.8.5"
 - "dotenv": "^16.0.1"
 - "express": "^4.18.1"
 - "mysql": "^2.18.1"

Ferramentas utilizadas no desenvolvimento:
 - "nodemon": "^2.0.2"
 - "[XAMPP](https://www.apachefriends.org/)": v3.3.0 (Apache & MySQL)
 - "[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)": v5.7.5
