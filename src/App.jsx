import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import "./App.css"
import AudioRecorder from "./AudioRecorder.jsx"

function App() {
  const [socket, setSocket] = useState(null)
  const [alert, setAlert] = useState(false)
  const [time, setTime] = useState(new Date())
  const [audio, setAudio] = useState(null)
  const [img, setImg] = useState("")


  useEffect(() => {
    const newSocket = io(/*"https://se101-backend-production.up.railway.app/"*/"http://localhost:3000") //https://se101-backend-production.up.railway.app/
    setSocket(newSocket)

    newSocket.on("connect", () => {
      newSocket.emit("join", { type: "client" })
    })

    newSocket.on("error", (req) => {
      console.log(req)
    })

    newSocket.on("alert", (req) => {
      setAlert(true)
    })

    newSocket.on("image", (req) => {
      setImg("data:image/jpeg;base64," + req.img)
      setTime(new Date(req.time))
      console.log(req.time)
    })

    newSocket.on("sound", (req) =>
    {
      console.log(req["audio"])
    })

  }, [])

  //Should reset the thingy to not fire when there is no fire, should work in theory, but in practice idk
  //one possible flaw is that assuming it is a constant feed of fires, the alert will constantly will set back
  //to false for brief periods.


  return (
    <section className="py-4">
      <div className="max-w-screen-xl mx-auto px-2 text-gray-600 gap-x-12 items-center justify-between flex flex-col">
        {img != ""? 
        <img
        style={{height: "300px", width: "500px", objectFit: "cover"}}
        src={img}
        className=" rounded-lg"
        alt=""
      />
      :
      <div
      className="flex justify-center items-center bg-black text-white rounded-lg"
      style={{height: "300px", width: "500px", objectFit: "cover"}}>
        LOADING
      </div>
      }
        <div className="mt-6">
          <div className="max-w-2xl">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Status:
            </h3>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              {alert ? "FIRE FIRE FIRE 🔥🔥🔥" : "👍 No Fire Detected 👍"}
            </p>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              Image taken at{" "}
              <small className="text-green-300 text-base">
                {(time.getHours() > 12 ? -12 : 0) + time.getHours()}:
                {(time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}{" "}
                {time.getHours() > 12 ? "PM" : "AM"}
              </small>
            </p>
            <div className="flex flex-col items-center justify-center mt-5">
              <AudioRecorder socket={socket} />
              <button
                onClick={() => {
                  socket.emit("move", {
                    direction: "up",
                    distance: 10,
                    id: 1, //id of request
                  })
                }}
                type="button"
                className="flex justify-center items-center bg-[#428df5] text-white text-[40px] w-[45px] h-[45px] rounded-xl"
              >
                &uarr;
              </button>
              <div className="flex flex-row gap-x-[60px]">
                <button
                  onClick={() => {
                    socket.emit("move", {
                      direction: "left",
                      distance: 10,
                      id: 1, //id of request
                    })
                  }}
                  type="button"
                  className="flex justify-center items-center bg-[#428df5] text-white text-[40px] w-[45px] h-[45px] rounded-xl"
                >
                  &larr;
                </button>
                <button
                  onClick={() => {
                    socket.emit("move", {
                      direction: "right",
                      distance: 10,
                      id: 1, //id of request
                    })
                  }}
                  type="button"
                  className="flex justify-center items-center bg-[#428df5] text-white text-[40px] w-[45px] h-[45px] rounded-xl"
                >
                  &rarr;
                </button>
              </div>
              <button
                onClick={() => {
                  socket.emit("move", {
                    direction: "down",
                    distance: 10,
                    id: 1, //id of request
                  })
                }}
                type="button"
                className="flex justify-center items-center bg-[#428df5] text-white text-[40px] w-[45px] h-[45px] rounded-xl"
              >
                &darr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
