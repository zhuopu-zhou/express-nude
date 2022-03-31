# Nude.js (express-nude)

Your nudes are safe with Nude.js. 

This package offers convenient options to safely find nude parameters in your Express API requests. In just a few lines of code defining what to expect from an HTTP request's (`headers`, `query` or `body`), Nude.js will return back if the client side is missing any of the required parameters.

## Overview

... diagram in progress

## Examples
- Import the package
```
const Nudes = require('express-nude')
```

- Initialize `Nudes` using express Request instance (e.g. `req`, `request`... etc).
```
    const nudes = Nudes(request)
```

- Handling nude headers that requires key `authorization`.
```
    const headersHandler = nudes.headers(['authorization'])
    if (headersHandler.isNude == true) {
        // Handle missing headers logic here...
        const responseObject = {
            'success': false, 
            'message': `Missing or invalid header values of keys: ${headersHandler.missingKeys.toString()}`
        }

        response.status(400)
        response.send(responseObject)
        return
    }
```

Handling nude query that requires keys `email` and `new_password`.

```
    const queryHandler = nudes.query(['email', 'new_password'])
    if (queryHandler.isNude == true) {
        // Handle missing query logic here...
        const responseObject = {
            'success': false, 
            'message': `Missing or invalid query values of keys: ${queryHandler.missingKeys.toString()}`
        }

        response.status(400)
        response.send(responseObject)
        return
    }
```

Handling nude body that requires keys `credentials.email`, `credentials.password.new`, `credentials.password.old` and `id`.

```
    const bodyHandler = nudes.body(['credentials.email', 'credentials.password.new', 'credentials.password.old', 'id'])
    if (bodyHandler.isNude == true) {
        // Handle missing body logic here...
        const responseObject = {
            'success': false, 
            'message': `Missing or invalid body values of keys: ${bodyHandler.missingKeys.toString()}`
        }

        response.status(400)
        response.send(responseObject)
        return
    }
```

## Install
```
npm install express-nude --save
```
## Upcoming Features
-[] Handling an array of objects with the same schema (i.e. only accept arrays of `User` where `User` must have `{ id: string, email: string }`)

## License

```
Nude.js (express-nude)
MIT License

Copyright (c) 2022 Ahmed Bekhit[me@ahmedbekhit.com] and Zhuopu Zhou[zzp951128@gmail.com]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```