# Vue.js with Shardb

> A Vue.js project, using https://github.com/share/sharedb

## Build Setup

For dev, running
`npm start`
Will run the client on port 8080, and the end point on 8081

For build, it will compile the express app in itself (so make sure to update the connection to point to a new port)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with express serving the build (this makes sharedb persistent accross tabs?)
npm run build

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
