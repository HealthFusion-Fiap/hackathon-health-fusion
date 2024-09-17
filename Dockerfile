
FROM node:20-alpine as dev

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o TypeScript globalmente
RUN npm install -g typescript

# Copie o restante do código da aplicação
COPY . .

# Compile o código TypeScript para JavaScript
RUN tsc

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
