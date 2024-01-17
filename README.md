# SaFire Frontend

Welcome to the frontend repository of SaFire, a state-of-the-art security solution that utilizes computer vision for fire detection, featuring comprehensive control and connectivity options for the user.

## Overview

SaFire integrates an embedded system with a security camera operated by a Raspberry Pi, capable of real-time fire detection. The frontend is crafted using React and communicates with the Raspberry Pi via websockets, enabling users to remotely maneuver the camera and issue voice commands remotely. This interface is pivotal for ensuring user engagement and enhancing the overall security experience.

## Features

- **Web Application**: A React-based user interface that is both responsive and intuitive.
- **Camera Control**: Websocket integration allows users to remotely control the camera orientation.
- **Voice Command**: Send voice recordings from the web interface to play through the device's speaker.
- **Live Feed**: Real-time streaming of the camera feed using WebRTC for instant surveillance.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Express**: Backend framework for Node.js.
- **Node.js**: JavaScript runtime for the backend server.
- **Flask**: Python framework for auxiliary backend services.
- **Socket.IO**: Enables real-time bidirectional event-based communication.
- **Raspberry Pi**: The hardware platform for the security camera.

## Usage

- **Camera Control**: Use the provided controls in the UI to adjust the camera angle.
- **Voice Commands**: Record your message and send it to the device for playback.
- **Monitoring**: Watch the live feed to monitor for any fire detections.

## Contributors

Special thanks to the individuals who have contributed to the development of SaFire's Frontend:

-   Jordan Kok - [@Ee-Hsin](https://github.com/Ee-Hsin)
-   Bokang Keith - [@SirMixalotMixalot](https://github.com/SirMixalotMixalot)
-   William Li - [[@willi-li-am](https://github.com/willi-li-am)]

## Contributing

Contributions to SaFire are welcome! Please refer to the contributing guidelines for more information on how to participate in the development.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For a complete understanding of how SaFire works, please refer to the backend repository and the Raspberry Pi setup instructions.

Elevate your security with SaFire – proactive, connected, secure.
