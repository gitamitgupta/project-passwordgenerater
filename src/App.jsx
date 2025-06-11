import { useState, useCallback ,useEffect, useRef} from 'react'



function App() {
  const [length, setlength] = useState("8");
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState("");
  // useRef hook
  const passwordgenerator =  useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789"
    }
    if (char) {
      str += "!@#$%^&*()"
    }
    for (let i = 1; i <= length; i++) {
      let alp = str[Math.floor(Math.random() * str.length)];
      pass += alp;
    }
    setpassword(pass);
  }
    , [length, number, char, setpassword])
 useEffect(()=>{
  passwordgenerator();
 },[length,number,char,passwordgenerator]);
 const passwordref=useRef(null);
 // copy form clipboard
 const copypasswordTOclipbord=useCallback(()=>{
  passwordref.current?.select();
  window.navigator.clipboard.writeText(password);
  alert(" copy!")

 },[password])


  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-4xl text-center text-white my-3'> password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text " value={password} className='outline w-full py-1 px-3' placeholder='password' readOnly ref={passwordref} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrike-0' onClick={copypasswordTOclipbord}> copy</button>
        </div>
        <div className='flex text-sm gap-x-1'>
          <div className='flex item-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              // onchange for length 
              onChange={(e) => {
                setlength(e.target.value);

              }}
            />
            <label> length :{length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
            <label> number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={char}
              id='numberInput'
              onChange={() => {
                setchar((prev) => !prev);
              }}
            />
            <label> characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
