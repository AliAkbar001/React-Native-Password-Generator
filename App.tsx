import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePassword = (passwordLength:number) => {
    let characters = ''
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numbersChars = "0123456789"
    const specialChars = "!@#$%^&*()_+[]\';/.,{}|:?> <`~"

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

    return result;
  }

  const resetStates = () =>{
    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(false)
    setNumbers(false)
    setUpperCase(false)
    setSymbols(false)
  }
  
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})