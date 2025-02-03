
#### Principais comandos
    ```
    nest -help

    nest g module tasks
    nest g mo tasks

    nest g co tasks
    nest g controller tasks --no-spec

    nest g s tasks
    nest g service tasks

    nest g f tasks
    nest g res tasks
    nest g res aluno --no-spec
    nest g mi tasks
    nest g pi tasks
    nest g ga tasks
    ```

#### Rotar projeto
    npm run start:dev

#### Prisma ORM

* instalar o prisma

```
npm install prisma --save-dev
```

```
npm install @prisma/client
```

```
npx prisma init
```

* .env config usando SQLite
```
DATABASE_URL="file:./dev.db"
```

* config shema.prisma
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Task{
  id          Int     @id @default(autoincrement())
  name        String 
  description String
  completed   Boolean

  createdAt DateTime?  @default(now())
}
```

* rodando a migration
```
npx prisma migrate dev
```

#### Criando modulo Prisma
```
nest g module prisma --no-spec
```

```
nest g service prisma --no-spec
```

npm install class-transformer class-validator

#### Multer Uploads
    npm install --save-dev @types/multer
    npm install --save @nestjs/serve-static

#### pegar link imagens
    http://localhost:8080/files/background.png

#### Documentação
    npm install --save @nestjs/swagger
    npm install swagger-ui-express

* url doc
```
http://localhost:8080/docs
```

#### Carteria 3%