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

	//var {lightName} = this.state.lightName;
	//const {Str} = this.state;

		console.log("äöäöl");
		fetch('http://192.168.0.124:3001/light/',{ //Bestämmer vart det nya värdet hamnar.
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

functionOne() {
	console.log("1")
	this.props.navigation.navigate('Screen2', {})
	
}
functionTwo() {
	console.log("2")
	this.InsertDataToServer();

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
										//Om man trycker på knappen kommer man till den andra skärmen där man kan ändra ljusets värme och ljusstryka. Samtidigt skapas ett nytt värde med 50% ljusstyrka.
									>
										
										<Text style={styles.item1TouchableOpacity}>
										
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