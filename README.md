# Introduction
**Contributors:**
1. *Huỳnh Phương Như* - Leader / Build / Document
2. *Lâm Thành Tín* - Design / Document
3. *Nguyễn Văn Dũng* - Design / Document

You can see the web's details in Product Document [here](./ProductDocument.pdf)

## Running product
For running, using `npm i` to install.
Then, `lerna bootstrap`

- Our back-end is located at: [./packages/strapi-atlas/api](./packages/strapi-atlas/api)
- Our front-end code is located at: [./packages/ec-web/pages](./packages/ec-web/pages)

For running you can run `npm run dev` in the two folder `ec-web` and `strapi-atlas`\
We install quite a lot of packages so sorry to be bothering.

## Initialize from the beginning
In case you want to create an NextJS web app with Strapi like us, you can do the following actions:

1. For the whole projects:\
npm i -g lerna
lerna init

2. For front-end we are using NextJS:
cd packages

npx create-next-app ec-web --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"

3. For BE we are using strapi to connect with MongoDB Atlas (Cloud):

npx create-strapi-app strapi-atlas

Then choose Custom and pick MongoDB
Extracting information from your uri and paste it in.


 
