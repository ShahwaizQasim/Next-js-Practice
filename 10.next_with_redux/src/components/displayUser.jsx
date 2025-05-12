"use client"

import { useSelector } from "react-redux"

const DisplayUser = ({ }) => {
  const usersGet = useSelector((data) => data.users);
  console.log("usersGet", usersGet);

  return (
    <div className="container mx-auto mt-7" style={{ height: '400px', border: "2px solid red" }}>
      <h2 className="text-2xl font-semibold p-3">Display User</h2>
      <ul>
        {
          usersGet.map((data) => {
            return <li key={data.id} className="pl-3">{data.name}</li>
          })
        }
      </ul>
    </div>
  )
}

export default DisplayUser