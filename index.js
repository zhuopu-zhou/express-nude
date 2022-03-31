const express = require('express')
const app = express()
app.use(express.json())
const Nudes = require('./nude-express')

/// A dummy GET endpoint validating a current user's password strength
app.get('/password/validate', (request, response) => {
    const nudes = Nudes(request)

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

    /**
     User required keys logic here...
     ...
     ...
     ...
     */

    response.send({'success': true})
})

/// A dummy POST endpoint updating a current user's password
app.post('/password/update', (request, response) => {
    const nudes = Nudes(request)

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

    // Nested objects demo
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

    /**
     User required keys logic here...
     ...
     ...
     ...
     */

    response.send({'success': true})
})

app.listen(3000, () => {
    console.log('listening.... on 3000')
})