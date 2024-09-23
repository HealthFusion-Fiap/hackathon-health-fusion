# Use uma imagem do Node.js
FROM node:20

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
