import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Minimum 4 characters required')
  .max(16, 'Maximum characters can be 16')
  .required('Minimum 4 characters required'),
  lowSeverity: Yup.boolean().required(),
  midSeverity: Yup.boolean().required(),
  highSeverity: Yup.boolean().required(),
  advSeverity: Yup.boolean().required(),
})
export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength:number) => {
    let characters = ''
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]\';/.,{}|:?> <`~";

    if(upperCase){
      characters += upperCaseChars
    }
    if(lowerCase){
      characters += lowerCaseChars
    }
    if(numbers){
      characters += numbersChars
    }
    if(symbols){
      characters += specialChars
    }

    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }

    setPassword(result)
    setIsPasswordGenerated(true)
  }

  const resetStates = () =>{
    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setNumbers(false)
    setUpperCase(false)
    setSymbols(false)
  }
  
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.mainHeading}>Password Generator</Text>
          <Formik
            initialValues={{ 
              passwordLength: '', 
              lowSeverity: true, 
              midSeverity: false, 
              highSeverity: false, 
              advSeverity: false 
            }}
            validationSchema={ PasswordSchema }
            onSubmit={ values => { 
              console.log(values)
              generatePassword(+values.passwordLength) 
            }}//+ convert string "number" into actual number
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.viewContainer}>
                  <View>
                    <Text style={styles.label}>Password Length:</Text>
                  </View>
                   <TextInput 
                    style={styles.input}
                    value={values.passwordLength} 
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 8'
                    keyboardType='numeric'
                    />
                </View>
                {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.error}>
                        {errors.passwordLength}
                      </Text>
                )}
                <View style={styles.border}></View>
                <View style={styles.viewContainer}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={()=> {
                      values.lowSeverity = !lowerCase;
                      setLowerCase(!lowerCase);
                    }}
                    fillColor='green'
                  />
                    <Text style={styles.label}>Include Lowercase Letters</Text>
                </View>
                <View style={styles.viewContainer}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={()=> {
                      values.midSeverity = !upperCase;
                      setUpperCase(!upperCase);
                    }}
                    fillColor='#fccb06'
                    />
                    <Text style={styles.label}>Include Uppercase Letters</Text>
                </View>
                <View style={styles.viewContainer}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={()=> {
                      values.highSeverity = !numbers;
                      setNumbers(!numbers);
                    }}
                    fillColor='#ff7f11'
                    />
                    <Text style={styles.label}>Include Numbers</Text>
                </View>
                <View style={styles.viewContainer}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={()=> {
                      values.advSeverity = !symbols;
                      setSymbols(!symbols);
                    }}
                    fillColor='#9395d3'
                    />
                    <Text style={styles.label}>Include Symbols</Text>
                </View>
                <View >
                  {!values.lowSeverity && !values.midSeverity && !values.highSeverity && !values.advSeverity && (
                  <Text style={styles.error}>
                    At least select one severity level.
                  </Text>
                )}
                </View>
                {isPasswordGenerated ? (
                    <View style={styles.pwdContainer}>
                      <Text style={styles.label}>Password:</Text>
                      <Text style={styles.label} selectable={true}>{password}</Text>
                    </View>
                  ) : null}
                <View style={styles.buttonContainer}>
                  <Button 
                    color={'green'}
                    title="Generate Password"
                    disabled={(!values.lowSeverity && !values.midSeverity && !values.highSeverity && !values.advSeverity) || !isValid}
                    onPress={()=>{handleSubmit()}}
                  />
                  <Button
                    color={'#800020'}
                    title="Reset"
                    onPress={() => {
                      handleReset();
                      resetStates();
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: 'black',
    fontSize: 16,
  },
  mainHeading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.8,
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8
  },
  label: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.8
  },
  input: {
    color: 'white',
    padding: 0,
    fontSize: 16,
    width: 60,
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  error:{
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5
  },
  border:{
    width: 150,
    backgroundColor: 'gray',
    height: 3,
    marginLeft: '28%',
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent:'flex-end',
    marginTop: 50,
    gap: 8
  },
  pwdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 8
  }
})