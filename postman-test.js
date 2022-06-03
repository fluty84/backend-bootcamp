const newman = require("newman")

newman.run({
    collection: require("./test_messages.postman_collection.json"),
    reporters: ['cli'],
    verbose: true
})