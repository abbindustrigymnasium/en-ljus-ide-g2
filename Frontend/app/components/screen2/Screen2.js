import React from 'react';
import { 
    StyleSheet,
    View,
} from 'react-native';
import {LinearGradient} from 'expo';


import Component9 from './Component9';
import Component11 from './Component11';


export default class Screen2 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
           
            Component9Visible: true,
            Component11Visible: true,
        }

    }

    toggleComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';
        let val  = this.state[prop];
        if (typeof val === 'undefined') {
            return false;
        }

        this.setState({
            [prop]: val === true ? false : true
        })

        return true;

    }

    hideComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: false
        })

        return true;

    }

    showComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: true
        })

        return true;

    }

    render() {
        return (

            
            <View style={styles.container}>

                <LinearGradient style={styles.screencontainer}
                colors={['#FF8900', '#4E3F2D' ]} > 
                                

                    <View style={styles.screencontainerInner}>
                        <Component11
                            navigation={this.props.navigation}
                            toggleComponent={ (component) => this.toggleComponent(component) }
                            hideComponent={ (component) => this.hideComponent(component) }
                            showComponent={ (component) => this.showComponent(component) }
                            visible={ this.state.Component11Visible }
                        />
                        <Component9 
                            navigation={this.props.navigation}
                            toggleComponent={ (component) => this.toggleComponent(component) }
                            hideComponent={ (component) => this.hideComponent(component) }
                            showComponent={ (component) => this.showComponent(component) }
                            visible={ this.state.Component9Visible }
                        />
                    </View>

                </LinearGradient>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    
	screencontainer: {
	    //backgroundColor: 'rgba(128,128,128,1)',
	    flex: 1,
	},
	
	screencontainerInner: {
	    flex: 1,
	},
	
});