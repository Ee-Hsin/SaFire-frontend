import { useState, useEffect } from "react"
import { io } from 'socket.io-client'
import axios from 'axios'

import "./App.css"

function App() {
  const [socket, setSocket] = useState(null)
  const [alert, setAlert] = useState(false)
  const [img, setImg] = useState("https://i.redd.it/dsb199buhxe51.jpg")
  const [time, setTime] = useState(new Date)

  useEffect(() => {
    const newSocket = io("https://se101-backend-production.up.railway.app/"); //https://se101-backend-production.up.railway.app/
    setSocket(newSocket);

    newSocket.on('error', (req) =>
    {
      console.log(req);
    })

    newSocket.on("alert", (req) => {
      console.log(req)
      setAlert(true);
    })

    newSocket.on("image", (req) => {
      setImg("data:image/jpeg;base64," + req.img);
      setTime(new Date(req.time));
    })
  }, [])
  return (
    <section className="py-4">
      <div className="max-w-screen-xl mx-auto px-2 text-gray-600 gap-x-12 items-center justify-between flex flex-col">
        <img
            style={{height: "300px", width: "500px", objectFit: "cover"}}
            src={img}
            className=" rounded-lg"
            alt=""
          />
        <div className="mt-6">
          <div className="max-w-2xl">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Status:
            </h3>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              {alert? "FIRE FIRE FIRE 🔥🔥🔥" : "👍 No Fire Detected 👍"}
            </p>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              Image taken at{" "}
              <small className="text-green-300 text-base">{(time.getHours() > 12 ? -12 : 0 )+ time.getHours()}:{((time.getMinutes() < 10) ? "0" : "") + time.getMinutes()} {time.getHours() > 12? "PM" : "AM"}</small>
            </p>
            <button
              onClick={() => {
                socket.emit("move", {
                direction: "up",
                distance: 1,
                "id": 1 //id of request
                });
              }}
    
              type="button"
              className="mt-6 outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &uarr;
            </button>
            <div className="mt-2">
              <button
              onClick={() => {socket.emit("move", {
                direction: "left",
                distance: 1,
                "id": 1 //id of request
              })}}
                type="button"
                className="mr-10 outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                &larr;
              </button>
              <button
              onClick={() => {socket.emit("move", {
                direction: "right",
                distance: 1,
                "id": 1 //id of request
              })}}
                type="button"
                className="text-white outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                &rarr;
              </button>
            </div>
            <button
              onClick={() => {socket.emit("move", {
                direction: "down",
                distance: 1,
                "id": 1 //id of request
              })}}
              type="button"
              className="mt-2 text-white outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &darr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
