import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";

export default class Component11 extends React.Component {
  state = {
    value:50,
    value2:50,
    
  };

  UpdateDataToServer1 = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen
		//var Name= this.state.n ;
		//const { price }  = this.state ;
		
	   fetch('http://192.168.0.124:3001/light/Warm', {  //Skickar värdena till databasen 
	   method: 'PATCH',	 //Post betyder skicka
		 headers: { // skickar med vilkoren 
		 'Accept': 'application/json', 
     'Content-Type': 'application/json',
     }
    
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
        //const { price }  = this.state ;
        
         fetch('http://192.168.0.124:3001/light/Cold', {  //Skickar värdena till databasen 
         method: 'PATCH',	 //Post betyder skicka
         headers: { // skickar med vilkoren 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
         }
        
         }).then((response) => response.json())  //gör om den till json
           .then((responseJson) => {
        
       // Showing response message coming from server after inserting records.
       
       console.log(responseJson); //Ser hela meddelandet från server
          
        
           }).catch((error) => { //Fångar fel
             console.error(error);
           });
          }


          functionOne() {
            //HEAD
             console.log("1")
             this.setState({ value });
            }
           
             
           
           functionTwo() {
             console.log("2")
             this.UpdateDataToServer2();
           
           }
           functionCombined() { //Sätter ihop funktionerna this.functionOne och this.functionTwo.
             this.functionOne();
               this.functionTwo();
               }
           
			  
    
  render() {
    return (
      <View style = {styles.container}>
        <View>
          <Slider style = {styles.slider}
            value={this.state.value}
            onValueChange={this.functionCombined}
           
            maximumValue={100}
            minimumValue={15}
            minimumTrackTintColor='rgb(0, 130, 255)'
            step={1}
            //value={this.state.value}
            
            //maximumValue={1024}
            //minimumValue={154} 
            minimumTrackTintColor='rgb(0, 130, 255)'
            step={1}
          />
          <Text style = {styles.blue}>
            Cold: {this.state.value + "%"}
          </Text>
        </View>
        <View>
          <Slider style = {styles.slider2}
            value={this.state.value2}
            onValueChange={value2 => this.setState({ value2 })}
            maximumValue={100}
            minimumValue={15} 
            minimumTrackTintColor='rgb(255, 130, 0)'
            step={1}
            value={this.state.value2}
            onValueChange={this.UpdateDataToServer1}
            maximumValue={1024}
            minimumValue={154} 
            minimumTrackTintColor='rgb(255, 130, 0)'
            step={1}
          />
          <Text style = {styles.red}>
            Warm: {this.state.value2 + "%"}
           
          </Text>
        </View>
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
    transform: [{rotate: '90deg'}],
    marginLeft: 175,
  },
  red: {
    color: 'orangered',
    transform: [{rotate: '90deg'}]
  },
  slider2: {
    marginTop: 60,
  }
});