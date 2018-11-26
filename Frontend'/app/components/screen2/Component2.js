import React from "react";
import Slider from "react-native-slider"; // 0.11.0
import { StyleSheet, View, Text } from "react-native";

export default class Component2 extends React.Component {
  state = {
    value: 0.2
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
        />
        <Text>
          Value: {this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});