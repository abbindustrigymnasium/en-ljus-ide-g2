router.post('/', (req, res, next) => {
    const light = {
        lightName: req.body.lightName,
        Str: req.body.Str
    };

    var Createdlight= function(){
        return new Promise(function(resolve,reject){

            var Thelight= [light.lightName,light.Str];
            console.log(Thelight);
            con.query('INSERT INTO light (lightName, Str) VALUES ?',[[Thelight]], function (error, results) {
                if (error)
                return reject (error);
                else
                return resolve(Thelight)
              });
        })
    }

    Createdlight().then( Thelight => {

        res.status(201).json({
            message:"Success, new value!",
            light: Thelight
        })
    }   ).catch(error => {
        res.status(500).json({
            error: error
        })
    });
    
    });