const apiKey = 'AIzaSyDFnaCC4WCFHC0d1qQXz_NjbqbKkCr3k3g'; // Change this to your YouTube API key 

function getRandomQuery() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let query = '';
    for (let i = 0; i < 3; i++) {
        query += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return query;
}

function loadRandomVideo() {
    const query = getRandomQuery();
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const video = data.items[0];
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const channelTitle = video.snippet.channelTitle;
            const videoContainer = document.getElementById('video-container');
            const videoInfo = document.getElementById('video-info');
            
            videoContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            videoInfo.innerHTML = `<p><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoTitle}</a> by ${channelTitle}</p>`;
        })
        .catch(error => console.error('Error:', error));
}