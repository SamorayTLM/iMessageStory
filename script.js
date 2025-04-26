// JavaScript for animating messages and exporting as video
const messages = [
    { type: 'sender', text: 'Hello! How are you?' },
    { type: 'receiver', text: "I'm good, thanks! What about you?" },
    { type: 'sender', text: 'Doing great! Want to hang out?' },
    { type: 'receiver', text: "Sure! Let's meet at 5 PM." },
];

const chatContainer = document.getElementById('chat-container');

// Function to create a message element
function createMessageElement(type, text) {
    const message = document.createElement('div');
    message.classList.add('message', type);
    message.innerHTML = `<p>${text}</p>`;
    return message;
}

// Function to show messages one by one
function showMessages() {
    let index = 0;

    function addNextMessage() {
        if (index < messages.length) {
            const { type, text } = messages[index];
            const messageElement = createMessageElement(type, text);

            chatContainer.appendChild(messageElement);

            // Trigger animation by adding the "visible" class
            setTimeout(() => {
                messageElement.classList.add('visible');
            }, 100);

            index++;

            // Schedule the next message
            setTimeout(addNextMessage, 1000);
        }
    }

    addNextMessage();
}

// Start the animation
window.onload = showMessages;

// Capture the animation and export as a video
document.getElementById('download-video').addEventListener('click', async () => {
    const frames = [];
    const durationPerFrame = 500; // 500ms per frame

    const html2canvas = await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js");

    // Capture each message after they load
    for (let i = 0; i < messages.length; i++) {
        const messageElements = document.querySelectorAll('.message');
        messageElements[i]?.classList.add('visible');

        const canvas = await html2canvas.default(chatContainer);
        frames.push(canvas.toDataURL('image/png'));

        // Wait for the duration of each frame
        await new Promise(resolve => setTimeout(resolve, durationPerFrame));
    }

    // Convert frames to a video using ffmpeg.js
    const ffmpeg = await import("https://cdn.jsdelivr.net/npm/ffmpeg.js@0.10.1/ffmpeg.min.js");

    const video = new ffmpeg.FFmpeg();
    await video.runCommand('-f', 'image2', '-framerate', '2', '-i', frames, '-pix_fmt', 'yuv420p', 'output.mp4');

    const videoBlob = video.FS.readFile('output.mp4');
    const videoURL = URL.createObjectURL(new Blob([videoBlob.buffer], { type: 'video/mp4' }));

    // Create a download link
    const a = document.createElement('a');
    a.href = videoURL;
    a.download = 'iMessageStory.mp4';
    a.click();
});