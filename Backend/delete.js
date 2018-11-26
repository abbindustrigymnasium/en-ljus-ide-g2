router.delete('/:lightName', (req, res, next) => {
   
    console.log(req.params.lightName);
    var deleteRows = function(){
        return new Promise(function(resolve, reject){
            const lightName = req.params.lightName;
            connection.query('DELETE FROM light WHERE lghtName = ?',[lightName], function (error, results) {
                console.log(error);
                if (error)
                return reject(error);
                else
                return resolve(results)
            });
        })
    }
    deleteRows().then(result => {

        if (result.length == 0) {
            res.status(404).json({
                message: "Lights off"
           });
       }
       else
       res.status(200).json(result)

} ).catch(error => {
        res.status(500).json({
           error: error
      })
    });
});
