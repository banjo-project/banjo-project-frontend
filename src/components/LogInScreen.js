import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import BottomNav from './BottomNav'
import HeaderImage from './HeaderImage'
import styles from '../styling/LogInScreen'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveName } from '../action/pets'

class LogInScreen extends React.Component {
  state = {
    openNameInput: false,
    openErrorMsg: false,
    humanEmail: '',
    humanPw: ''
  }

  static navigationOptions = {
    headerTitle: <HeaderImage />,
    headerStyle: {
      height: 100,
      fontWeight: 'bold',
    },
  };

  handleNext = () => {
    if(!this.state.humanEmail || !this.state.humanPw){ 
      return this.setState({ openErrorMsg: true })
    }
    this.props.navigation.navigate('DailySchedulePage')
  }

  render() {
  const image = this.props.humansData.humanImage
    return (
      <View style={styles.container}>
        <View style={styles.contentsContainer}>
        {image ? (
          <View style={styles.roundImage} onPress={this.handleAddImage}>
            <Image style={styles.image} source={{ uri: image }} /> 
          </View>
        ) : (
          <TouchableOpacity style={styles.roundImage} onPress={this.handleAddImage}>
            <Image style={styles.image2} source={require('../../assets/happy.png')}/> 
            <Text style={styles.roundImageText}>+ Human Image</Text>
          </TouchableOpacity>
        )}
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.textInput1} onChangeText={(humanEmail) => this.setState({humanEmail})}></TextInput>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput2} onChangeText={(humanPw) => this.setState({humanPw})}></TextInput>
          </View>
  
          {this.state.openErrorMsg? (
            <View>
             <Text>Please type valid email address and password.</Text>
            </View>
          ) : null}
          <Button title="Submit" style={styles.nextBtn} onPress={this.handleNext}></Button>
        </View>
        <View style={styles.bottomNavContainer}>
          <BottomNav />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    petsData: state.petsData,
    humansData: state.humansData
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ saveName }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen)

