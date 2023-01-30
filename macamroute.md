# macam macam route yang bisa di pakai

# 1. first version

```js
// route/index.js
const userRoutes = require('./user');
const articleRoutes = require('./article');
```

```
[
    ...userRoutes,
    ...articleRoutes
]
```

```
- routes
    - index.js
    - v1
        - index.js
        - users.js
        - products.js
        - orders.js
        - payments.js
    - v2
        - index.js
        - users.js
        - products.js
        - orders.js
        - payments.js
```

```
- routes
    - index.js
    - v1
        - index.js
        - users
            - index.js
            - create.js
            - update.js
            - delete.js
        - products
            - index.js
            - create.js
            - update.js
            - delete.js
    - v2
        - index.js
        - users
            - index.js
            - create.js
            - update.js
            - delete.js
        - products
            - index.js
            - create.js
            - update.js
            - delete.js

```
