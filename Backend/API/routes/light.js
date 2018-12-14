const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var con = mysql.createConnection({  //connecta till mysql till databasen
    host     : 'iot.abbindustrigymnasium.se',
    user     : 'ljuside2',
    password : 'lokförarkatt',
    database : 'ljuside2'
}); 

con.connect(function(err){  //påminn om connect blir ett error
    if (err) 
    throw err;
});

var Values_FromDB;  
var cron = require('node-cron');

cron.schedule('*/10 * * * * *', () =>  {    //node cron körs var 10:de sekund
  
    var GetLight = function(){  //
        return new Promise(function(resolve,reject){
            con.query('SELECT * FROM light', function (error, results) {
            if (error) 
            return reject (error);
            else
            return resolve(results)          
            });
        });
    }

    GetLight().then( result => {    //om det går att connecta, console logga "..."
        Values_FromDB= result; 
        console.log("...") 
        });
});
 
router.get('/', (req, res) => {     //getta värde från databas
    res.status(200).json({
        messege: 'Getter', 
        result: Values_FromDB
    });
});

router.post('/', (req, res, next) => {  //post funktion för att kunna tända lampan
    var Createdlight= function(){
        return new Promise(function(resolve,reject){
            con.query('INSERT INTO `light` (`lightName`, `StrCold`, `StrWarm`) VALUES ("lightName", 500, 500); ', function (error, results) {   //post i lightName "lightName" och 500 på både StrWarm och -Cold
                if (error)
                    return reject (error);
                else
                    return resolve(results)
            });
        })
    }   

    Createdlight().then( Thelight => {  //om man lyckades posta, ska det skicka ett meddelande
        res.status(201).json({
            message:"Success, new value!",
            light: Thelight
        })
    }).catch(error => { //annars påminner det att blev nåt fel
        res.status(500).json({
            error: error
        })
    });    
});

router.delete('/', (req, res, next) => {   //delete funktion, delete allt från databas för att kunna släcka lampan
    console.log(req.params.lightName);
    var deleteRows = function(){
        return new Promise(function(resolve, reject){
            const lightName = req.params.lightName;
            con.query('DELETE FROM light',[lightName], function (error, results) {
                console.log(error);
                if (error)
                    return reject(error);
                else
                    return resolve(results)
            });
        })
    }
    deleteRows().then(result => {   //skicka ett medddelande för att visa att den funkar
        if (result.length == 0) {
            res.status(404).json({
                message: "Lights off"
            });
        }
        else
            res.status(200).json(result)
    
    })  .catch(error => {   //informera om det blir något fel
            res.status(500).json({
            error: error
            })
        });
});

router.patch('/', (req, res) => {   //patch funktion för att kunna ändra ljus styrkan     
    const light = {
        lightName: req.body.lightName,
        StrCold: req.body.StrCold,
        StrWarm: req.body.StrWarm
    }        
    var updateValue = function(){
        return new Promise(function(resolve, reject){
            con.query('UPDATE `light` SET `StrCold` = ?,  `StrWarm` = ? WHERE `lightName`= lightName', [light.StrCold, light.StrWarm, light.lightName], function (error, results) {
                if (error)
                    return reject(error)
                else
                    return resolve(results)
            });
        })
    }
    updateValue().then(result => {  //informera
        if (result.affectedRows > 0)
            res.status(200).json(result);
        else
            res.status(404).json({
            message: "Not found"
        });
    
    })  .catch(error => {   
        console.log(error)
            res.status(500).json({
                error: error
            })
        });
});

module.exports = router;