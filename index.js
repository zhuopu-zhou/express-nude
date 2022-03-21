const express = require('express')
const app = express()
const NoNudes = require('./nonudeparams-express')

app.get('/', (request, response) => {
    const isSuccess = NoNudes(request, response, 'query', ['name', 'email', 'password'])
    console.log(isSuccess)
    if (isSuccess == true) {
        response.send({'success': true})
    } else {
        response.send({'success': false, 'message': 'missing input values'})
    }
})

app.listen(3000, () => {
    console.log('listening.... on 3000')
})