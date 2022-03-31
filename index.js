const express = require('express')
const app = express()
app.use(express.json())
const NoNudes = require('./nonudeparams-express')
const Nudes = require('./nude-express')

app.get('/', (request, response) => {
    const nudes = Nudes(request)
    const headersHandler = nudes.headers(['authorization'])
    const queryHandler = nudes.query(['name.last', 'name.first', 'email.object.value.isValidated', 'password'])

    const nudeParamsHandler = NoNudes(request, 'query', ['name.last', 'name.first', 'email.object.value.isValidated', 'password'])
    const missingKeys = JSON.stringify(nudeParamsHandler.missingKeys)

    if (nudeParamsHandler.isNude == false) {
        response.send({'success': true})
    } else {
        response.send({'success': false, 'message': `Missing or invalid values of keys: ${missingKeys}`})
    }
})

app.post('/', (request, response) => {
    const nudeParamsHandler = NoNudes(request, 'body', ['name.last', 'name.first', 'email.object.value.isValidated', 'email.object.value.isCrazy', 'password'])
    const nudeHeadersHandler = NoNudes(request, 'headers', ['authorization'])
    const missingParamsKeys = JSON.stringify(nudeParamsHandler.keys)
    const missingHeadersKeys = JSON.stringify(nudeHeadersHandler.keys)

    if (nudeHeadersHandler.isNude == true) {
        response.send({'success': false, 'message': `Missing or invalid headers values of keys: ${missingHeadersKeys}`})
    } else if (nudeParamsHandler.isNude == true) {
        response.send({'success': false, 'message': `Missing or invalid body values of keys: ${missingParamsKeys}`})
    }else if (nudeHeadersHandler.isNude == false && nudeParamsHandler.isNude == false) {
        /**
         * do logic here...
         */
        response.send({'success': true})
    } else {
        response.send({'success': false, 'message': '....'})
    }
})

app.listen(3000, () => {
    console.log('listening.... on 3000')
})