import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";

export default class Component11 extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      lightName: "lightName" ,
      value: 500,
      value2: 500

       
    }

}




  

UpdateDataToServer = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen
  //var Name= this.state.n ;
  const { lightName } = this.state;
  const { value }  = this.state;
  const { value2 }  = this.state;

  console.log(value);
  console.log(value2);
   fetch('iot.abbindustrigymnasium.se:3000/grupp2/', {  //Skickar värdena till databasen 
   method: 'PATCH',	 //Post betyder skicka
   headers: { // skickar med vilkoren 
   'Accept': 'application/json', 
   'Content-Type': 'application/json',
   },

 body: JSON.stringify({
    
  lightName: lightName,
     StrCold: value,
    StrWarm: value2
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
            onValueChange={value => { this.UpdateDataToServer({ value }); this.setState({value});} }
            
    
           
           
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
            onValueChange={value2 => { this.UpdateDataToServer({ value2 }); this.setState({value2});} }
            
            
           
           
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
    paddingTop: 250,
    transform: [{rotate: '270deg'}]
  },
  blue: {
    color: 'lightblue',
    marginLeft: 20,
    paddingTop:300,
    paddingLeft: 50,
  
    marginBottom:0,
    zIndex: -100,
   
    
    
    

  
    //width: 60
  },
  red: {
    color: 'rgb(255,255,102)',
    marginLeft:250,
    marginTop:-275,
    marginBottom:300,
    paddingBottom: -400,
    paddingRight: 500,
    marginBottom:0,
  
  },
  viewWarm: {
    marginTop: -130,
    marginLeft: 500 ,
    marginRight:500,
    paddingTop:120,
   
    marginBottom:100,
    
    
    
    
  },
  viewCold: {
   // width: 300,
  
    marginRight:400,
    marginLeft: -320 ,
    marginBottom: 200,
    marginTop:-230,
    

    

  },

  slider: {

    //marginBottom: -30,
    marginLeft: 100,
    marginRight: -290,

  },

  slider2: {

    marginLeft: -140,
    marginRight: -320,

  },
});