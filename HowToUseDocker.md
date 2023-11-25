## Instalar uma imagem
docker pull nome_da_imagem 
ex.: docker pull postegres

## Listar imagens instaladas
docker image ls

## Criar um container
docker run --name name_of_container
-e serve para definir variáveis de ambiente
variáveis do postegres: POSTGRES_USER=root, POSTGRES_PASSWORD=root
-p é a porta do container
portas 5432:5432 padrão do postgres
-d significa detection que serve para rodar em 2° plano
porfim colocamos o nome da imagem que queremos rodar nesse container
o código fica assim:

docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
                   ∟ nome do nosso container

## Listar os containers criados
docker container ls -a

## Listar os containers que estão em execução
docker ps

##  Iniciar um container
Você pode startar um container pelo seu nome ou pelo seu id
docker start nome_do_container(ou id)

## Parar execução de um container
Você pode parar a execução de um container pelo seu nome ou pelo seu id
docker stop nome_do_container(ou id)

## Excluir uma imagem
Você pode excluir uma imagem pelo seu nome ou pelo seu id
docker rmi postgres
-- para apagar uma imagem os containers que estão utilizando essa imagem precisam estar fora de execução e deletados.
-- em resumo para apagar uma imagem você não pode estar usando ela em nenhum container.

## Usando
vamos dizer que queremos executar nosso container de forma interativa usando o bash terminal
docker exec -it pg bash

## Logando no banco de dados
psql -U nome_do_usuario_declarado_na_variavel_de_ambiente.
psql -U root

## Listando as base de dados
\l

as querys sql devem ser passadas no terminal
no caso nossa primeira query vai ser criar o banco de dados então deve-se passar a query
CREATE DATABASE nome_da_base;

CTRL+L = LIMPAR TERMINAL

## Conectar a base de dados
\c nome_da_base

## Listar tabelas do banco
\dt

## Conectando banco de daos como código
intalar o pg para fazer a conexão
conexão do postgres com o node.
npm install pg

## Iniciar uso após toda configuração feita.
Inicie o docker no computador
agora é no terminal do vscode
docker start nome_do_container → EX.: docker start pg
docker exec -it pg bash → iniciando o container no terminal
psql -U root → Logando no banco