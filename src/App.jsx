import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [password,setPassword] = useState("")
  const [length,setLength] = useState(8);
  const [nuAllowed,setNuAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const passwordChanger = useCallback((()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz";
    if(nuAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()_+=-{}[]:;'/.,<>"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char);
    }
    setPassword(pass)
  }),[setPassword,length,nuAllowed,charAllowed])
  useEffect((()=>{
    passwordChanger()
  }),[nuAllowed,length,charAllowed,passwordChanger])
  const passwaordRef = useRef(null);
  const copyButton = useCallback((()=>{
    passwaordRef.current?.select()
    passwaordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  }),[password])
  return (
    <>
        <div className=' w-full bg-gray-600  my-8 mx-auto max-w-md rounded-3xl px-3 py-4 shadow-md text-amber-500'>
          <h1 className='text-white text-center m-3 w-full'>Password Generator</h1>
          <div className='flex shadow'>
              <input className='rounded-lg px-3 py-1 w-screen outline-none shadow-md'
              type="text" 
              value={password}
              placeholder='Password'
              ref ={passwaordRef}
              readOnly
              />
              <button className='outline-none bg-blue-900 rounded-lg px-2 shrink-0' onClick={copyButton}>copy</button>
          </div>
          <div className='flex shadow items-center'>
              <input type="range" 
              value={length}
              min = {6}
              max={100}
              className='my-2'
              onChange={(e)=>setLength(e.target.value)}
              /><lebel> length : {length}</lebel>
              <input type="checkbox"
              className='mx-2'
              value={charAllowed}
              onChange={()=>{
                setCharAllowed((pre)=>!pre)
              }}
              /><lebel>character</lebel>
              <input type="checkbox"
              className='mx-2'
              value={nuAllowed}
              onChange={()=>{
                setNuAllowed((pre)=>!pre)
              }}
              /><lebel>number</lebel>
          </div>
        </div>
    </>
  )
}

export default App
