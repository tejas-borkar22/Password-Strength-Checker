import './App.css';
import { useEffect, useState } from 'react';
import {hasNumber,hasUpperCase,hasLowerCase,hasSpecialCharacter} from './utils';

function App() {
  const [password, setPassword] = useState("");
  const [strength,setStrength] = useState(0);
  const [progressBarStyles,setProgressBarStyles] = useState({
    width : '0%',
    backgroundColor : 'transparent'
  });
   
  const handlePwdChange = (event) => {
    setPassword(event.target.value);
  }

  useEffect(()=> {
  // calculate the strength
  // update progress according to password strength
  // pwd.strength = pwd.length + pwd.characterType
  // totalStrength <= 10

  let totalStrength = 0;
  if(password.length > 3){
    const strengthByLength = Math.min(6,Math.floor(password.length / 3));
    // console.log("By length = "+ strengthByLength);
    let strengthByCharacterType = 0;

    if(hasNumber.test(password)){
      strengthByCharacterType += 1;
      // console.log("By numbers = "+ strengthByCharacterType);
    }
    if(hasUpperCase.test(password)){
      strengthByCharacterType += 1;
      // console.log("By upper case = "+ strengthByCharacterType);
    }
    if(hasLowerCase.test(password)){
      strengthByCharacterType += 1;
      // console.log("By lower case = "+ strengthByCharacterType);
    }
    if(hasSpecialCharacter.test(password)){
      strengthByCharacterType += 1;
      // console.log("By special case = "+ strengthByCharacterType);
    }

    // console.log("By chars = "+ strengthByCharacterType);
    totalStrength = strengthByLength + strengthByCharacterType;
    // console.log("Total Password Strength = "+ totalStrength);
  }
  else
   totalStrength = 0;

  setStrength(totalStrength);
  setProgressBarStyles({
    backgroundColor : 'red',
    width : `${totalStrength * 10}%`
  })
  if(totalStrength > 8){
    setProgressBarStyles({backgroundColor : 'green', width : `${totalStrength * 10}%`})
  }else if(totalStrength > 6){
    setProgressBarStyles({backgroundColor : 'orange' ,width : `${totalStrength * 10}%`})
  }
  } , [password])
  return (
    <div className="App">
      <h1 className="App-header">Password Strength Checker 🔒🔑</h1>
      <input type="text" value={password} onChange={handlePwdChange} placeholder="Enter your password !!!"/>
      <div className="progress-container">
        <div className="progress-bar" style={ {...progressBarStyles} }></div>
      </div>
      <p>Strength of your password (out of 10) is {strength}</p>
    </div>
  );
}

export default App;
