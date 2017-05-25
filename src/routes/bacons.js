const router = require('express').Router()
const mySQLWrapper = require('../lib/mysqlWrapper')

router.get('/', async (req, res) => {
    try {
        
        //Grabs a connection and opens a transaction
        let connection = await mySQLWrapper.getConnectionFromPool();
        await mySQLWrapper.beginTransaction(connection);

        //Uses the opened transaction to do some change to the DB
        let now = await mySQLWrapper.createTransactionQuery({
            query: 'SELECT NOW()',
            connection
        })

        //Commits the transaction
        mySQLWrapper.commit(connection);

        //Returns to the caller
        return res.status(200).send(now)        
    } catch (error) {
        //Returns the error
        return res.status(500).send(error)
    }

})

module.exports = router
