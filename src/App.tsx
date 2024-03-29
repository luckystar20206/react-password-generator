import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [uppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [specialCharsAllowed, setSpecialCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let passwordValue = "";

    let str = "";

    if (uppercaseAllowed)
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lowercaseAllowed)
      str += "abcdefghijklmnopqrstuvwxyz";
    
    if (numbersAllowed)
      str += "0123456789";

    if (specialCharsAllowed)
      str += "!@#$%^&*()_-+=[]{}:;,.";

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      const character = str.charAt(randomIndex);
      passwordValue += character;
    }

    setPassword(passwordValue);

  }, [length, uppercaseAllowed, lowercaseAllowed, numbersAllowed, specialCharsAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, uppercaseAllowed, lowercaseAllowed, numbersAllowed, specialCharsAllowed])

  return (
    <div className='w-6/12 mx-auto mt-12 py-8 border border-1 border-slate-500 bg-violet-200 rounded-lg'>
      <h1 className='text-center text-3xl mb-4 font-bold'>Random Password Generator</h1>
      <p className='text-center mb-8'>Create strong and secure passwords to keep your account safe online.</p>
      <div className='text-center'>
        <input type="text" placeholder='password' className='px-6 py-2 rounded-full mr-6' value={password} readOnly/>
        <i className="fa-solid fa-rotate mr-6 cursor-pointer" onClick={() => passwordGenerator()}></i>
        <button className='bg-blue-600 text-white px-3 py-2 rounded-full w-24 font-bold'>Copy</button>
      </div>
      <div className='flex justify-center gap-10 my-8'>
        <p className='w-24'>Password length: <span className='font-bold'>{length}</span></p>
        <input type="range" min={1} max={50} value={length} className='hover:cursor-pointer' onChange={(event) => setLength(Number(event.target.value))} />
      </div>
      <div className='flex justify-center gap-12'>
        <p className='w-24'>Characters used: </p>
        <div className='flex gap-6 items-center'>
          <div className='flex items-center gap-2'>
            <input type="checkbox" className='w-5 h-5' checked={uppercaseAllowed} readOnly />
            <label className='font-bold'>ABC</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type="checkbox" className='w-5 h-5' defaultChecked={lowercaseAllowed} onChange={() => setLowercaseAllowed((prevValue) => !prevValue)} />
            <label className='font-bold'>abc</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type="checkbox" className='w-5 h-5' defaultChecked={numbersAllowed} onChange={() => setNumbersAllowed((prevValue) => !prevValue)} />
            <label className='font-bold'>123</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type="checkbox" className='w-5 h-5' defaultChecked={specialCharsAllowed} onChange={() => setSpecialCharsAllowed((prevValue) => !prevValue)} />
            <label className='font-bold'>#$&</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
