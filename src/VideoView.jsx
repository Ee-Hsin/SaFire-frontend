import React, { useEffect } from "react";

const VideoView = ({ socket }) => {
  useEffect(() => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    let peerConnection;

    socket.onmessage = async (event) => {
      const message = event.data;

      if (message.type === "offer") {
        peerConnection = new RTCPeerConnection(configuration);
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.sdp)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.send({
          type: "answer",
          sdp: peerConnection.localDescription,
        });
      } else if (message.type === "candidate") {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(message.candidate)
        );
      }
    };

    let remoteVideo;

    const setupPeerConnection = (event) => {
      const stream = event.streams[0];
      //sets the video source to the remote video stream
      remoteVideo.srcObject = stream;
    };

    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send({ type: "candidate", candidate: event.candidate });
      }
    };
    peerConnection.ontrack = setupPeerConnection;

    remoteVideo = document.getElementById("remoteVideo");
  }, []);

  return (
    <div>
      <video id="remoteVideo" autoPlay></video>
    </div>
  );
};

export default VideoView;
