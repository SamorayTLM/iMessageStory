# iMessage Story Exporter

This project allows you to create an iMessage-style animated story and export it as a video file.

## Features
- Animated chat bubbles appearing one at a time.
- Export the animation as an MP4 video.
- Simple, customizable UI.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari).
- No additional installations are required as it uses HTML, CSS, and JavaScript with browser-based libraries.

### How to Run
1. Open the `index.html` file in your browser.
2. Watch the animated story play out.
3. Click the "Download Video" button to save the animation as an MP4 file.

## Libraries Used
- [html2canvas](https://github.com/niklasvh/html2canvas): To capture the chat as frames.
- [ffmpeg.js](https://github.com/Kagami/ffmpeg.js): To encode the frames into a video.

## Customization
- Modify the `messages` array in `script.js` to change the chat content.
- Adjust animation timing in `script.js` for a faster or slower playback.

## Limitations
- Video export may take additional processing time depending on the number of messages and frame rate.

---
