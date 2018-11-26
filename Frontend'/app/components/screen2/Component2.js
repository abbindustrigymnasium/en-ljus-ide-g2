import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";

export default class Component2 extends React.Component {
  state = {
    value:15
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          maximumValue={100}
          minimumValue={15} 
          step={1}
        />
        <Text>
          Value: %{this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop:10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});