Local dev setup

1. Install project dependencies

```
npm i
```

2. Create a .env file from the .env.example file

```
cp .env.example .env
```

3. Seed the database

```
npm run db:seed
```

3. Run the project

```
npm run dev
```

Use prisma studio to view the database

```
npx prisma studio
```
