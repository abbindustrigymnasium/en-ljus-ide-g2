import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';


export default class Component9 extends React.Component {
	
	constructor(props){

		super(props);
		this.state= {
			lightName: "",
			Str: ''
    	}
	}

	DeleteDataFromServer = () =>{ //Skapar en metod som tar värdena name och price så använder vi dem för att skicka till databasen

		console.log("bla")
		fetch('iot.abbindustrigymnasium.se:3000/grupp2/', {  //Skickar värdena till databasen 
			method: 'DELETE',	 //Post betyder skicka
			headers: { // skickar med vilkoren 
				'Accept': 'application/json', 
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())  //gör om den till json
			.then((responseJson) => {
		
	// Showing response message coming from server after inserting records.
	
			console.log(responseJson); //Ser hela meddelandet från server
			//Skriver vilken produkt som blivit tillagd
			}).catch((error) => { //Fångar fel
				console.error(error);
			});
			
	}

	functionOne() {	//en funktion som ska göra så att den byter screen
		this.props.navigation.navigate('Screen1', {});
			
	}

	functionTwo() {	//funktion som kör delete
		console.log("bye");
		this.DeleteDataFromServer ();

	}
	functionCombined() {	//funktion som kör båda samtidigt
		this.functionTwo();
		this.functionOne();	
	}

    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View style={styles.component}>

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <TouchableOpacity 
										style={styles.item1}
										onPress={() => this.functionCombined()}	//när man trycker på knappen ska den köra functionCombined
									>
										
											
										<Image
          									source={require('../../img/Off.png')} 
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
	  
	   marginBottom: -100,
	  alignItems: 'center',
	},
	
	item1TouchableOpacity: {
	    color: '#fff',
	    fontSize: 14,
	    textAlign: 'center',
	    width: '100%',
	},
	
});