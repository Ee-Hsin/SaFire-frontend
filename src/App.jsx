// import { useState } from "react"
import "./App.css"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <section className="py-4">
      <div className="max-w-screen-xl mx-auto px-2 text-gray-600 gap-x-12 items-center justify-between flex flex-col">
        <div className="max-w-md my-2">
          <img
            src="https://i.redd.it/dsb199buhxe51.jpg"
            className="rounded-lg"
            alt=""
          />
        </div>
        <div className="mt-6">
          <div className="max-w-2xl">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Status:
            </h3>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              👍 No Fire Detected 👍
            </p>
            <p className="mt-3 font-bold text-white bg-slate-500 p-4 rounded-lg">
              Image taken at{" "}
              <small className="text-green-300 text-base">10:07pm</small>
            </p>
            <button
              type="button"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              &uarr;
            </button>
            <div className="mt-2">
              <button
                type="button"
                className="mr-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                &larr;
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                &rarr;
              </button>
            </div>
            <button
              type="button"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
