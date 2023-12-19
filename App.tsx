import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      <SafeAreaView>
        <View>
          <Text>Password Generation</Text>
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
                <View>
                  <View>
                    <Text>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                   <TextInput 
                    value={values.passwordLength} 
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 8'
                    keyboardType='numeric'
                    />
                </View>
                <View>
                  <Text>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={()=> {
                      values.lowSeverity = !lowerCase;
                      setLowerCase(!lowerCase);
                    }}
                    fillColor='green'
                  />
                </View>
                <View>
                  <Text>Include Uppercase Letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={()=> {
                      values.midSeverity = !upperCase;
                      setUpperCase(!upperCase);
                    }}
                    fillColor='yellow'
                  />
                </View>
                <View>
                  <Text>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={()=> {
                      values.highSeverity = !numbers;
                      setNumbers(!numbers);
                    }}
                    fillColor='blue'
                  />
                </View>
                <View>
                  <Text>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={()=> {
                      values.advSeverity = !symbols;
                      setSymbols(!symbols);
                    }}
                    fillColor='purple'
                  />
                </View>
                <View style={styles.width}>
                  {!values.lowSeverity && !values.midSeverity && !values.highSeverity && !values.advSeverity && (
                  <Text>
                    At least select one severity level.
                  </Text>
                )}
                </View>
                <View>
                  <TouchableOpacity 
                    style={styles.width}
                    disabled={(!values.lowSeverity && !values.midSeverity && !values.highSeverity && !values.advSeverity) || !isValid}
                    onPress={()=>{handleSubmit()}}
                  >
                    <Text>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.width}
                    onPress={() => {
                      handleReset();
                      resetStates();
                    }}
                  >
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View>
            <Text>Result:</Text>
            <Text>Long Press to Copy</Text>
            <Text selectable={true}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  width:{
    fontSize: 40,
    margin: 10
  }
})