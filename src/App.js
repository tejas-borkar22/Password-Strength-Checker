import './App.css';
import { useEffect, useState } from 'react';
import {hasNumber,hasUpperCase,hasLowerCase,hasSpecialCharacter} from './utils';

function App() {
  const [password, setPassword] = useState("");
  const [strength,setStrength] = useState(0);
  const [progress,setProgress] = useState(25);
   
  const handlePwdChange = (event) => {
    setPassword(event.target.value);
  }

  useEffect(()=> {
  // calculate the strength
  // update progress according to password strength
  // pwd.strength = pwd.length + pwd.characterType
  // totalStrength <= 10

  const updateProgressBarColor = {
    backgroundColor : 'red'
  }
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

  totalStrength > 8 ?  updateProgressBarColor.backgroundColor = 'green' : updateProgressBarColor.backgroundColor = 'orange';
  setProgress(totalStrength * 10);


  } , [password])
  return (
    <div className="App">
      <h1 className="App-header">Password Strength Checker 🔒🔑</h1>
      <input type="text" value={password} onChange={handlePwdChange} placeholder="Enter your password !!!"/>
      <progress id="file" value={progress} max="100"></progress>
      <p>Strength of your password (out of 10) is {strength}</p>
    </div>
  );
}

export default App;
