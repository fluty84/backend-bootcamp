const router = require("express").Router();


router.use("/messages", require("./messages.routes") )


module.exports = router;
