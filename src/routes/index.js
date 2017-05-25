const bacons = require('./bacons')

module.exports = class Routes {
    
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        //Throws if no instance of express was passed
        if (app == null) throw new Error("You must provide an instance of express")

        //Registers every route files
        app.use('/bacons', bacons)
    }

}
