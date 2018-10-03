import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class Home extends React.Component {

  render() {

    return (
        <View style={style.home}>
          <TextInput
            style={style.input}
            placeholder="Enter License Plate"
          />
          <View style={style.buttonContainer}>
            <Button
              style={style.button}
              title="Lookup"
            />
            <Button
              style={style.button}
              title="Sumit"
            />
          </View>
        </View>
    )

  }

}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#777',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#841584',
    color: '#fff',
    borderRadius: 4
  }
})
