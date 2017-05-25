const router = require('express').Router()
const mySQLWrapper = require('../lib/mysqlWrapper')

/**
 * Gets a list of bacons
 */
router.get('/', async (req, res) => {
    try {
        //Recovers the persisted bacon
        let bacons = await mySQLWrapper.createQuery({
            query: `SELECT * FROM bacons;`
        })

        //Returns to the caller
        return res.status(200).send(bacons)
    } catch (error) {
        //Returns the error
        return res.status(500).send(error)
    }
})

/**
 * Gets a bacon by its ID
 */
router.get('/:id', async (req, res) => {
    try {
        //Recovers the persisted bacon
        let bacon = await mySQLWrapper.createQuery({
            query: `SELECT * FROM bacons WHERE id = ?;`,
            params: [req.params.id]
        })

        bacon = bacon.shift()

        //Returns 404 if no register was found
        if (bacon == null) return res.sendStatus(404);

        //Returns to the caller
        return res.status(200).send(bacon)
    } catch (error) {
        //Returns the error
        return res.status(500).send(error)
    }
})

/**
 * Creates a bacon
 */
router.post('/', async (req, res) => {

    let connection
    let insertResult

    try {
        //Grabs a connection and opens a transaction
        connection = await mySQLWrapper.getConnectionFromPool();
        await mySQLWrapper.beginTransaction(connection);
        
        //Uses the opened transaction to do some change to the DB
        insertResult = await mySQLWrapper.createTransactionalQuery({
            query: `INSERT INTO bacons (type, price) VALUES (?, ?);`,
            params: [
                req.body.type,
                req.body.price
            ],
            connection
        })

        //Commits the transaction
        await mySQLWrapper.commit(connection)
    } catch (error) {
        //Rollback and return with error to the caller
        await mySQLWrapper.rollback(connection)
        return res.status(500).send(error)
    }

    try {
        //Recovers the persisted bacon
        let bacon = await mySQLWrapper.createQuery({
            query: `SELECT * FROM bacons WHERE id = ?;`,
            params: [insertResult.insertId]
        })

        //Returns to the caller
        return res.status(200).send(bacon.shift())
    } catch (error) {
        //Returns the error
        return res.status(500).send(error)
    }

})

/**
 * Updates a bacon
 */
router.put('/:id', async (req, res) => {

    let connection

    try {
        //Grabs a connection and opens a transaction
        connection = await mySQLWrapper.getConnectionFromPool();
        await mySQLWrapper.beginTransaction(connection);
        
        //Uses the opened transaction to do some change to the DB
        await mySQLWrapper.createTransactionalQuery({
            query: `UPDATE bacons SET type = ?, price = ? WHERE id = ?;`,
            params: [
                req.body.type,
                req.body.price,
                req.params.id
            ],
            connection
        })

        //Commits the transaction
        await mySQLWrapper.commit(connection)
    } catch (error) {
        //Rollback and return with error to the caller
        await mySQLWrapper.rollback(connection)
        return res.status(500).send(error)
    }

    try {
        //Recovers the persisted bacon
        let bacon = await mySQLWrapper.createQuery({
            query: `SELECT * FROM bacons WHERE id = ?;`,
            params: [req.params.id]
        })

        //Returns to the caller
        return res.status(200).send(bacon.shift())
    } catch (error) {
        //Returns the error
        return res.status(500).send(error)
    }

})

/**
 * Deletes a bacon
 */
router.delete('/:id', async (req, res) => {

    let connection

    try {
        //Grabs a connection and opens a transaction
        connection = await mySQLWrapper.getConnectionFromPool();
        await mySQLWrapper.beginTransaction(connection);
        
        //Uses the opened transaction to do some change to the DB
        await mySQLWrapper.createTransactionalQuery({
            query: `DELETE FROM bacons WHERE id = ?;`,
            params: [
                req.params.id
            ],
            connection
        })

        //Commits the transaction
        await mySQLWrapper.commit(connection)
        return res.sendStatus(200);
    } catch (error) {
        //Rollback and return with error to the caller
        await mySQLWrapper.rollback(connection)
        return res.status(500).send(error)
    }

})

module.exports = router
