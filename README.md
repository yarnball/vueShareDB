# Vue.js with Shardb

> A Vue.js project, using https://github.com/share/sharedb

## Build Setup

For dev, running
`npm start`
Will run the client on port 8080, and the end point on 8081

For build, it will compile the vue app to `/dist` and the express serve will run it from there. Remeber to update the port

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with express serving the build (this makes sharedb persistent accross tabs?)
npm run build

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## OTypes
- To query data, there are special parametres:
    - https://github.com/ottypes/json0

## Running test
- `npm run build`
- `serve /dist`

* npm -g serv will act as a simple host/server for my files