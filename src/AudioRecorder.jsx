import { useState, useRef } from "react";

const mimeType = "audio/webm"; //wav support is limited unlike webm support

// eslint-disable-next-line react/prop-types
const AudioRecorder = ({ socket }) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioBlob, setAudioBlob] = useState();
  const [audio64, setAudio64] = useState();
  const [hasRun, setHasRun] = useState(false);

  function blobToBase64(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
        console.log(reader.result);
        setAudio64(reader.result);
      };
    });
  }

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    setHasRun(true);
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

      //creates a playable URL from the blob file.
      setAudioBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  return (
    <div className="mb-4">
      <div className="audio-controls">
        {!permission ? (
          <button
            onClick={getMicrophonePermission}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
          >
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              enableBackground="new 0 0 512 512"
            >
              <g>
                <g>
                  <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z" />
                  <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z" />
                </g>
              </g>
            </svg>
            Microphone
          </button>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <button
            className="mb-2 flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700"
            onClick={startRecording}
            type="button"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>record [#982]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-380.000000, -3839.000000)"
                  fill="#000000"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M338,3689 C338,3691.209 336.209,3693 334,3693 C331.791,3693 330,3691.209 330,3689 C330,3686.791 331.791,3685 334,3685 C336.209,3685 338,3686.791 338,3689 M334,3697 C329.589,3697 326,3693.411 326,3689 C326,3684.589 329.589,3681 334,3681 C338.411,3681 342,3684.589 342,3689 C342,3693.411 338.411,3697 334,3697 M334,3679 C328.477,3679 324,3683.477 324,3689 C324,3694.523 328.477,3699 334,3699 C339.523,3699 344,3694.523 344,3689 C344,3683.477 339.523,3679 334,3679"
                      id="record-[#982]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            Start {hasRun ? "New" : ""} Recording
          </button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button
            className="mb-2 flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700"
            onClick={stopRecording}
            type="button"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>record [#982]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-380.000000, -3839.000000)"
                  fill="#000000"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M338,3689 C338,3691.209 336.209,3693 334,3693 C331.791,3693 330,3691.209 330,3689 C330,3686.791 331.791,3685 334,3685 C336.209,3685 338,3686.791 338,3689 M334,3697 C329.589,3697 326,3693.411 326,3689 C326,3684.589 329.589,3681 334,3681 C338.411,3681 342,3684.589 342,3689 C342,3693.411 338.411,3697 334,3697 M334,3679 C328.477,3679 324,3683.477 324,3689 C324,3694.523 328.477,3699 334,3699 C339.523,3699 344,3694.523 344,3689 C344,3683.477 339.523,3679 334,3679"
                      id="record-[#982]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            Stop Recording
          </button>
        ) : null}
      </div>
      {audio ? (
        <div>
          <audio className="my-2" src={audio} controls></audio>
          {/* <a download href={audio}>
              Download Recording
            </a> */}
          <button
            className="mt-2 flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700"
            onClick={() => {
              console.log("Sending Audio...");
              console.log("Sending...", audioBlob);
              // eslint-disable-next-line react/prop-types
              socket.emit("sound", {
                audio: audioBlob,
              });
              console.log(mediaRecorder);
            }}
          >
            Send Recording
            <svg
              width="20px"
              height="20px"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z"
                fill="#000000"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default AudioRecorder;
