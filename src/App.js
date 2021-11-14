import React,{useState,useEffect} from "react";

const App=()=>{
  const [name,setName]=useState();
  const [mobile,setmobile]=useState();
  const [userlist,setuserlist]=useState();
  const [internetcheck,setinternetcheck]=useState(1);
  useEffect(()=>{
    fetch("http://localhost:3000/listall",{
      method:'GET',
      mode:'cors',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      }
    }).then((res)=>res.json()).then((result)=>{
     setuserlist(result);
    }).catch((err)=>{
      console.error(err);
    })
  },[internetcheck]);

  const submit = ()=>{
    fetch("http://localhost:3000/insert",{
      method:'POST',
      mode:'cors',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name:name,
        mobile:mobile
      })
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.error(err);
    })
  }
  const edit = (Name,Mobile,id)=>{
    fetch("http://localhost:3000/update",{
      method:'POST',
      mode:'cors',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        Name:Name,
        Mobile:Mobile,
        id:id
      })
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.error(err);
    })
  }
  const deleteRow = (id)=>{
    fetch("http://localhost:3000/delete",{
      method:'POST',
      mode:'cors',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        id:id
      })
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.error(err);
    })
  }

  return(
      <div
      style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",flexDirection:"column"}}
      >
        <h1>Front end simple CRUD</h1>
        <div>
          <h3>Insert New</h3>
          <input
          placeholder="Enter Name"
          onChange={(e)=>{
            setName(e.target.value);
          }}
          />
          <input
          placeholder="Enter Mobile"
          onChange={(e)=>{
            setmobile(e.target.value);
          }}
          />
          <button
          onClick={()=>{
            submit();
            setinternetcheck(internetcheck+1);
          }}
          >
            Submit
          </button>
        </div>
        <div>
          <h3>List of Users</h3>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
            </tr>
            {userlist!==undefined?userlist.map((k)=>{
              return(
                <tr>
                  <td>
                    {k.id}
                    </td>
                  <td><input
                    value={k.Name}
                      onChange={(e)=>{
                        const name = e.target.value;
                          setuserlist(cp=>cp.map((x)=>x.id===k.id?{
                            ...x,
                            Name:name
                          }:x))
                      }}
                    /></td>
                  <td><input
                    value={k.Mobile}
                      onChange={(e)=>{
                        const mob = e.target.value;
                          setuserlist(cp=>cp.map((x)=>x.id===k.id?{
                            ...x,
                            Mobile:mob
                          }:x))
                      }}
                    /></td>
                  <td>
                  <button
                    onClick={()=>
                    {
                      edit(k.Name,k.Mobile,k.id);
                    }}
                  
                  >Submit edit</button>
                  </td>
                  <td>
                    <button
                      onClick={()=>{
                          deleteRow(k.id);
                          setinternetcheck(internetcheck+1);
                      }}
                    >
                      Delete User
                    </button>
                  </td>
                  
                </tr>
              )
            }):''}
          </table>
        </div>
      </div>
  )
}
export default App;