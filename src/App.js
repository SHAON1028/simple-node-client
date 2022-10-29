import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
 const handleAddUser = (e)=>{
  e.preventDefault()
  const form = e.target
  const name = e.target.name.value
  const email = e.target.email.value
  const user = {name,email}
  fetch('http://localhost:5000/users',{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res=>res.json())
  .then(data=>{
    const newUser = [...users,data]
    setUsers(newUser)
    console.log(user)
  })
  .catch(err=>console.err(err))
  console.log(user)
  form.reset()
 }
  return (
    <div className="App">
      <form  onSubmit={handleAddUser} action="">
        <label htmlFor="">Name </label>
        <input type="text" name='name' />
        <br/>
        <label htmlFor="">Email </label>
        <input type="email" name='email' />
        <br/>
        <button type="submit">Add user</button>
      </form>
      <h2> Users:{users.length}</h2>
      {
        users.map(p=> <p key={p.id} >{p.name} {p.email}</p>)
      }
    </div>
  );
}

export default App;
