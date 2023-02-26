const express = require('express'),
      router = express.Router();

router.get('/',(req,res) => {
    res.render('login',{err_level: undefined},(err,html) => {
        if(err) {
            console.log(err.stack);
            throw err;
        }
        res.end(html);
    });
});
module.exports = router;