router.patch('/:lightName', (req, res) => {
    const lightName = {
        lightName: req.body.lightName,
        Str: req.body.Str
    }

    var updateValue = function(){
        return new Promise(function(resolve, reject){
            con.query('UPDATE `light` SET `Str` = ? WHERE `lightName` = ?,',[lightName.Str, lightName.lightName], function (error, results) {
                if (error)
                return reject(error);
                else
                return resolve(results)
            });
        })
    }
    updateValue().then(result => {
        if (result.affectedRows > 0)
            res.status(200).json(result);   
        else
            res.status(404).json({
            message: "Not found"
        });

} ).catch(error => {
        res.status(500).json({
           error: error
      })
    });
});