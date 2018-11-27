import React from 'react'; //Importerar den här komponenten från React.
import { //Bestämmer vad som ska importeras för att användas i den här komponenten där man kan tända lampan.
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'; //StyleSheet, View, Text och TouchableOpacity importeras från react-native.


export default class Component1 extends React.Component {

constructor(props)
{

	super(props)
	this.state= {
		lightName: '',
		Str: ''	
	}
}

InsertDataToServer =() => {

	var {lightName} = this.state.lightName;
	const {Str} = this.state;

		if (lightName='') { //Om lampan är släckt. (Lampan är alltid släckt i den första skärmen, screen1.)
		fetch('http://192.168.0.117:3001/light/',{ //Bestämmer vart det nya värdet hamnar.
			method: 'POST', //Bestämmer att ett nytt värde skapas.
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ //Gör om det som skickas till json-format.
				lightName: lightName, //Bestämmer att lightName ska heta lightName på http://192.168.0.104:3001/light.
				Str: Strength ////Bestämmer det ska stå Strength istället för Str på http://192.168.0.104:3001/light.
			})
		}).then((response) => response.json()).then(responseJSON => { //Gör om responsen till json-format.

			console.log(responseJSON); //Gör så att vi ser om värdet har skickats.
			alert(responseJSON.message+'	'+ lightName); //Visar om det gick att skicka det nya värdet.

		}).catch((error)=>{
			console.log(error); //Meddelar vad som är fel.
		});
		}
}

functionOne() {
	this.props.navigation.navigate('Screen2', {})
	
}
functionTwo() {
	this.InsertDataToServer 

}
functionCombined() {
	this.functionOne();
		this.functionTwo();
		}

    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View 
                style={styles.component}
            >

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <TouchableOpacity 
										style={styles.item1}
										onPress={() => this.functionCombined()} 
										 //Om man trycker på knappen kommer man till den andra skärmen där man kan ändra ljusets värme och ljusstryka.
									>
										
										<Text style={styles.item1TouchableOpacity}>
											On
										</Text>
									
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