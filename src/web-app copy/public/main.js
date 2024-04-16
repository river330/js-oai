console.log("Hello, main.js");

const submit = document.getElementById("submit");

function uploadVideo() {
  // Get the file input element and retrieve the selected file
  const videoInput = document.getElementById("videoInput");
  const file = videoInput.files[0];

  if (file) {
    // Create a new video element and canvas element
    const videoElement = document.createElement("video");
    const canvasElement = document.createElement("canvas");
    const context = canvasElement.getContext("2d");

    // Set the source of the video element to the uploaded file
    videoElement.src = URL.createObjectURL(file);

    let frames = [];

    // When the video metadata (like duration and dimensions) is loaded
    videoElement.addEventListener("loadedmetadata", function () {
      // Set the canvas size to the video dimensions
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      // Define an interval for how often to capture frames, here set to every second
      const captureInterval = 1000; // milliseconds

      // Start playing the video
      videoElement.play();

      // Use setInterval to execute code every 'captureInterval' milliseconds
      const interval = setInterval(() => {
        // If the video has ended, log a message and clear the interval to stop frame capturing
        if (videoElement.ended) {
          console.log("Video ended");
          clearInterval(interval);

          // After collecting all frames, send them to the server
          sendFramesToServer(frames);
          return;
        }

        // Draw the current video frame onto the canvas
        context.drawImage(
          videoElement,
          0,
          0,
          videoElement.videoWidth,
          videoElement.videoHeight,
        );

        // Convert the canvas image to a Base64-encoded JPEG image
        const frame = canvasElement.toDataURL("image/jpeg", 0.5); // Captures frame as JPEG

        // Optionally, log or handle the frame data URL (e.g., for debugging or direct display)
        console.log(frame); // Logs data URL of the captured frame
        frames.push(frame);
      }, captureInterval);
    });
  } else {
    // Log a message if no file is selected when the submit button is clicked
    console.log("No file selected");
  }
}

submit.addEventListener("click", uploadVideo);
console.log(frames);

function sendFramesToServer(frames) {
  console.log("Sending frames to the server individually...");
  let allLetters = [];

  frames.forEach((frame, index) => {
    fetch("/upload_frame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frame }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Response for frame ${index}:`, data);
        if (data.success && typeof data.letter === "string") {
          console.log(`Frame ${index} recognition success:`, data.letter);
          allLetters.push(data.letter.trim());
          if (allLetters.length === frames.length) {
            console.log(
              "All frames processed. Full message:",
              allLetters.join(" "),
            );
          }
        } else {
          console.error(`Recognition failed for frame ${index}:`, data.error);
        }
      })
      .catch((error) =>
        console.error(`Error uploading frame ${index}:`, error)
      );
  });
}
