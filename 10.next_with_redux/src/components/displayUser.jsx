"use client"

import { removeUser } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux"

const DisplayUser = ({ }) => {
  const usersGet = useSelector((data) => data.users);
  const dispatch = useDispatch(); 
  console.log("usersGet", usersGet);

  const handleRemove = (id) => {
    dispatch(removeUser(id))
  }

  return (
    <div className="container mx-auto mt-7" style={{ height: '400px', border: "2px solid red", overflow:"auto" }}>
      <h2 className="text-2xl font-semibold p-3">Display User</h2>
      <ul>
        {
          usersGet.map((data) => {
            return <li key={data.id} className="pl-3 flex justify-between bg-black text-white w-[200px] px-4 py-2 text-sm mt-2 rounded ml-3">
              {data.name} <span className="cursor-pointer" onClick={() => handleRemove(data.id)}>Delete</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default DisplayUser