```
npm init -y
npm i express
npm i mongoose
npm i typescript --save-dev //as dev dependancy
npm i cors
npm i dotenv
```
- We have to initialize json file for ts so we will write
```
tsc -init
in tsconfig.json we will write
"rootDir": "./src",
```

- we have to initialize express
```ts
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//node .\dist\app.js   
```

- node can not run ts so we will convert that into js
so we have to write a script

```package.json
 "scripts": {
    "build":"tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```
then we can run by
```
npm run dev
```
- We need to run a command to run code of es6 before
```
// every file should have declaration file
npm i --save-dev @types/node
npm i --save-dev @types/express
npm i --save-dev @types/cors
```


- Eslint and Prettier part
```
https://blog.logrocket.com/linting-typescript-eslint-prettier
```
```tsconfig.json
 "include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
```
- we have to instal eslint
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```
- now we need eslint file
```
npx eslint --init
```
You can also run this command directly using 'npm init @eslint/config@latest'.

> first-project@1.0.0 npx
> create-config

@eslint/create-config: v1.4.0

√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · typescript
√ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm



- Ultimate running code 
```
node .\dist\server.js
```

## Pretter with ESLint

```
npm install --save-dev prettier
to fixed prettier
npx prettier --write src
```

```
ctrl + shift + p -----> Developer: Reload window
after adding the extention
```

 - use this so that prettier and eslint will not fight
 ```
 npm install --save-dev eslint-config-prettier
 ```

 - To run easily 
 ```
npm install ts-node-dev --save-dev
 to run
npx ts-node-dev --respawn --transpile-only src/server.ts

 ```

 - To run by nodemon
 ```
 step 1:
 npm install ts-node nodemon --save-dev

 step 2: nodemon.json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/server.ts"
}

step 3: package.json
{
  "scripts": {
    "dev": "nodemon"
  }
}

step 4 : run code 
npm run dev

```


## Validator
```
npm i -D  @types/validator  
```

## Installing Joi
```
npm i joi
```