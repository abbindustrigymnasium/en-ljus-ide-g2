import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";

export default class Component11 extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      lightName1: "Cold" ,
      lightName2: "Warm",
  value: 500,
  value2: 500

       
    }

}




  

UpdateDataToServer1 = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen
  //var Name= this.state.n ;
  const { value2}  = this.state ;
  const { lightName2 }  = this.state ;
  var Str = (value2); 
  var Warm= (lightName2);
   fetch('http://192.168.0.126:3001/light/Warm', {  //Skickar värdena till databasen 
   method: 'PATCH',	 //Post betyder skicka
   headers: { // skickar med vilkoren 
   'Accept': 'application/json', 
   'Content-Type': 'application/json',
   },

   body: JSON.stringify({
    
    lightName: Warm,
    Str: Str
   })

    
    
	   }).then((response) => response.json())  //gör om den till json
			 .then((responseJson) => {
		
	 // Showing response message coming from server after inserting records.
	 
	 console.log(responseJson); //Ser hela meddelandet från server
		  
		
			 }).catch((error) => { //Fångar fel
			   console.error(error);
       });
      }




      
      UpdateDataToServer2 = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen
        //var Name= this.state.n ;
        const { value}  = this.state ;
        const { lightName1 }  = this.state ;
        var Str = (value); 
        var Cold= (lightName1);
         fetch('http://192.168.0.126:3001/light/Cold', {  //Skickar värdena till databasen 
         method: 'PATCH',	 //Post betyder skicka
         headers: { // skickar med vilkoren 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
         },

         body: JSON.stringify({
          
          lightName: Cold,
          Str: Str
         })
        
        
         }).then((response) => response.json())  //gör om den till json
           .then((responseJson) => {
        
       // Showing response message coming from server after inserting records.
       
       console.log(responseJson); //Ser hela meddelandet från server
          
        
           }).catch((error) => { //Fångar fel
             console.error(error);
           });
          }
          


         
  render() {
    return (
      <View>
      <View style = {styles.container}>
        <View  style = {styles.viewCold}>
          <Slider style = {styles.slider}
            //value={this.state.value}
            value={this.state.value}
            onValueChange={value => { this.UpdateDataToServer2({ value }); this.setState({value});} }
            
    
           
           
            maximumValue={1000}
            minimumValue={15}
            minimumTrackTintColor='rgb(0, 130, 255)'
            step={1}
            //value={this.state.value}
          />
          </View>
                  </View>
          <Text style = {styles.blue}>
            Cold: {this.state.value/10 + "%"}
          </Text>
          <View style = {styles.container}>
          <View  style = {styles.viewWarm}>
          <Slider style = {styles.slider2}
            //value={this.state.value}
            value={this.state.value2}
            onValueChange={value2 => { this.UpdateDataToServer1({ value2 }); this.setState({value2});} }
            
            
           
           
            maximumValue={1000}
            minimumValue={15}
            minimumTrackTintColor='rgb(255, 130, 0)'
            step={1}
            //value={this.state.value}
          />
          </View>
        </View>
          <Text style = {styles.red}>
            Warm: {this.state.value2/10 + "%"}
           
          </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop:10,
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 7.5,
    transform: [{rotate: '270deg'}]
  },
  blue: {
    color: 'lightblue',
    marginLeft: 75,
    marginTop: 150
  },
  red: {
    color: 'orangered',
    marginRight: 120
  },
  viewWarm: {
    marginTop: 70,
  },
  viewCold: {
    width: 300,
    marginRight: 300,
    marginBottom: 160
  }
});