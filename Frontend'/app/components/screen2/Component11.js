import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";

export default class Component11 extends React.Component {
  state = {
    value:15,
    value2:15
    
  };

  render() {
    return (
      <View style = {styles.container}>
        <View>
          <Slider style = {styles.slider}
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            maximumValue={100}
            minimumValue={15}
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