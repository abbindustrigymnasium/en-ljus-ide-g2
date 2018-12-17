import React from 'react'; //Importerar den här komponenten från React.
import { //Bestämmer vad som ska importeras för att användas i den här komponenten där man kan tända lampan.
	StyleSheet,
	View,
	TouchableOpacity,
	Image
} from 'react-native'; //StyleSheet, View, Text och TouchableOpacity importeras från react-native.



export default class Component1 extends React.Component {

constructor(props){
	
	super(props)

	this.state= {
		lightName: '',
		Str: ''
	}
}

componentDidMount() { //Körs när allt är inladdat
    let self = this; //Kallar this för self för att lättare använda

    fetch('http://iot.abbindustrigymnasium.se:3000/grupp2/Str', {  //Urlen där vi vill skicka ifrån (Detta är datorns ipadress, hämtas via ipconfig i cmd, ip4)
    	method: 'GET'  //Säger att det är GET vi vill använda
	  }).then((response) => response.json())  //Gör om resultatet till json

	.then((responseJson) => {	// console.log(responseJson, 'res');	// self.setState({ products: Object.assign(responseJson.result, products)  });
       
    var Str = responseJson.result; //Sätter result som en variabel
      	if (responseJson.message == "Getter") { //Om response.message är Getter
        	if (responseJson.result.length!=0) {
    			self.setState({ //Sätter värden till statevariablen        
           			Str: Str , //TAr första produkten i listans namn     
    			})
			}
		}
	});
}

DeleteDataFromServer = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen
	console.log("bla")
    fetch('http://iot.abbindustrigymnasium.se:3000/grupp2', {  //Skickar värdena till databasen 
    	method: 'DELETE',	 //Post betyder skicka
		headers: { // skickar med vilkoren 
	'Accept': 'application/json', 
    'Content-Type': 'application/json',
	 	}
   	}).then((response) => response.json())  //gör om den till json
	.then((responseJson) => {	// Showing response message coming from server after inserting records.
		console.log(responseJson); //Ser hela meddelandet från server //Skriver vilken produkt som blivit tillagd
	}).catch((error) => { //Fångar fel
		console.error(error);
	});
}

InsertDataToServer =() => {
	console.log("äöäöl");
	fetch('http://iot.abbindustrigymnasium.se:3000/grupp2/Str',{ //Bestämmer vart det nya värdet hamnar.
		method: 'POST', //Bestämmer att ett nytt värde skapas.
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
		
	}).then((response) => response.json()).then(responseJSON => { //Gör om responsen till json-format.
		console.log(responseJSON); //Gör så att vi ser om värdet har skickats.
		
	}).catch((error)=>{
		console.log(error); //Meddelar vad som är fel.
	});
}

    render() {
        if (!this.props.visible) {
            return false;
        }
        return(
            <View style={styles.component}>

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <TouchableOpacity 
										
										onPress={() => { this.DeleteDataFromServer();  this.InsertDataToServer(); this.props.navigation.navigate('Screen2', {});}}
										//Om man trycker på knappen kommer man till den andra skärmen där man kan ändra ljusets värme och ljusstryka. Samtidigt skapas ett nytt värde med 50% ljusstyrka.
								>																				
										<Image
          									source={require('../../img/OnOff.png')} style={styles.On}
        								/>
									
									</TouchableOpacity>

                			</View>

                		</View>

                	</View>
                	
                </View>				
				
            </View>
        );
    }
}

const styles = StyleSheet.create({

	On: { 
		marginTop: 600,
		//marginBottom: 10
	},
    
	component: {
	    width: '100%',
	    flexDirection: 'row',
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},
	
	layout1: {
	    width: '100%',
	    height: 90,
	},
	
	itemcontainer1: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	},
	
	itemcontainer1Inner: {
	    width: '100%',
	    height: '100%',
	    position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	
	item1: {
	    backgroundColor: '#1194f6',
	    borderWidth: 0,
	    borderColor: '#eee',
	    borderStyle: 'solid',
	    borderRadius: 4,
	    width: '100%',
	    height: '100%',
	    justifyContent: 'center',
	    alignItems: 'center',
	    overflow: 'hidden',
	    padding: 10,
	},
	
	item1TouchableOpacity: {
	    color: '#fff',
	    fontSize: 14,
	    textAlign: 'center',
	    width: '100%',
	},
	
});