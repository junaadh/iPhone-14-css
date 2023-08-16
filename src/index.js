const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
const currentDate = new Date().toLocaleDateString(undefined, dateFormat);
dateElement.textContent = currentDate;

const currentTime = new Date();
const hours = String(currentTime.getHours()).padStart(2, '0'); // Get hours in 2-digit format
const minutes = String(currentTime.getMinutes()).padStart(2, '0'); // Get minutes in 2-digit format
const formattedTime = `${hours}:${minutes}`;
timeElement.textContent = formattedTime;

document.addEventListener("DOMContentLoaded", function() {

    const buttons = document.querySelectorAll("#change-color button");
    const wallpaper = document.getElementById("wallpaper");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove border from all buttons
            buttons.forEach(btn => {
                btn.classList.remove("border");
                btn.classList.remove("border-white");
                btn.classList.remove("animate-bounce");
            });

            // Add border to the clicked button
            button.classList.add("border");
            button.classList.add("border-white");
            button.classList.add("animate-bounce");


            // Update wallpaper image based on the clicked button
            const imgSrc = button.querySelector("img").getAttribute("src");

            wallpaper.setAttribute("src", imgSrc);
        });
    });

    const powerButton = document.getElementById("power");
    const pill = document.getElementById("pill");
    const statusBar = document.getElementById("status-bar");
    const dynIsland = document.getElementById("dyn-island");
    const dynIslandAOD = document.getElementById("dyn-island-aod");
    const muteButton = document.getElementById("mute");
    const dynIslandSilent = document.getElementById("dyn-island-silent");
    const controlCenter = document.getElementById("control-center");
    const signal = document.getElementById("signal");
    const dynIslandRing = document.getElementById("dyn-island-ring");

    powerButton.addEventListener("click", () => {
        if (pill.classList.contains("bg-white") && !statusBar.classList.contains("hidden")) {
            pill.classList.remove("bg-white");
            pill.classList.add("bg-gray-500");
            statusBar.classList.add("hidden");
            wallpaper.classList.add("brightness-[30%]")
            dynIsland.classList.add("hidden");
            dynIslandAOD.classList.remove("hidden");
        } else {
            pill.classList.add("bg-white");
            pill.classList.remove("bg-gray-500");
            statusBar.classList.remove("hidden");
            wallpaper.classList.remove("brightness-[30%]")
            dynIsland.classList.remove("hidden");
            dynIslandAOD.classList.add("hidden");
        }
    })

    // Function to create or update the 'muted' cookie
    function setMutedCookie(value) {
        document.cookie = `muted=${value}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
    }

    // Function to read the 'muted' cookie
    function getMutedCookie() {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'muted') {
                return value;
            }
        }
        return null;
    }

    muteButton.addEventListener("click", () => {
        // Check if 'muted' cookie is present
        const mutedCookieValue = getMutedCookie();

        if (mutedCookieValue === "unmuted") {
            dynIslandSilent.classList.remove("hidden");
            if (!pill.classList.contains("bg-white")) {
                dynIslandAOD.classList.add("hidden");
            } else {
                dynIsland.classList.add("hidden");
                controlCenter.classList.remove("left-[279px]");
                controlCenter.classList.add("left-[299px]");
                signal.classList.add("hidden");
            }

            setTimeout(() => {
                console.log("muting");
                dynIslandSilent.classList.add("hidden");
    
                if (pill.classList.contains("bg-white")) {
                    dynIsland.classList.remove("hidden");
                    controlCenter.classList.remove("left-[299px]");
                    controlCenter.classList.add("left-[279px]");
                    signal.classList.remove("hidden");
                } else {
                    dynIslandAOD.classList.remove("hidden");
                }
                setMutedCookie("muted");
            }, 3500);

        } else if (mutedCookieValue === "muted"){
            dynIslandRing.classList.remove("hidden");
            if (!pill.classList.contains("bg-white")) {
                dynIslandAOD.classList.add("hidden");
            } else {
                dynIsland.classList.add("hidden");
                controlCenter.classList.remove("left-[279px]");
                controlCenter.classList.add("left-[299px]");
                signal.classList.add("hidden");
            }

            setTimeout(() => {
                console.log("unmuting");
                dynIslandRing.classList.add("hidden");
    
                if (pill.classList.contains("bg-white")) {
                    dynIsland.classList.remove("hidden");
                    controlCenter.classList.remove("left-[299px]");
                    controlCenter.classList.add("left-[279px]");
                    signal.classList.remove("hidden");
                } else {
                    dynIslandAOD.classList.remove("hidden");
                }
                setMutedCookie("unmuted");
            }, 3500);
        } else {
            setMutedCookie("unmuted")
        }

    })

    const player = document.getElementById('player');
    const cover = document.getElementById('cover');
    const trackName = document.getElementById('title');
    const artistName = document.getElementById('artist');
    const elapsed = document.getElementById('elapsed');
    const length = document.getElementById('length');
    const scrubber = document.getElementById('scrubber');
    const prevButton = document.getElementById('prev');
    const playButton = document.getElementById('playpause');
    const nextButton = document.getElementById('next');
    const playIcon = document.getElementById('play');
    const pauseIcon = document.getElementById('pause');

    const clientId = '5f56ac4110084091bcd953a152dd05a7';
    const redirectUri = 'http://127.0.0.1:5501/src/animation3.html';
    const scopes = ['user-read-playback-state', 'user-read-currently-playing', 'user-modify-playback-state'];

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);

    if (window.location.href.includes('access_token')) {
        setTimeout(() => {
            window.location.href = url;
        }, 3600000)
    } else {
        window.location.href = url;
    }

    console.log(url);
    let accessToken;
    // Check if the URL contains an access_token parameter
    if (window.location.href.includes('access_token')) {
        accessToken = window.location.href.split('#')[1].split('=')[1].split('&')[0];
    }
    console.log(accessToken);

    function convertMsToMinsAndSecs(milliseconds, is_negative) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = minutes.toString().padStart(1, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedTime = is_negative ? `-${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
    
        return formattedTime;
    }

    function fetchCurrentTrack() {
        fetch('https://api.spotify.com/v1/me/player/currently-playing?market=MY', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const currentTrack = data.item;
            cover.src = currentTrack.album.images[0].url;
            trackName.textContent = currentTrack.name;
            artistName.textContent = currentTrack.artists.map(artist => artist.name).join(', ');
            const progress = data.progress_ms;
            const duration = currentTrack.duration_ms;
            const remaining = duration - progress;
            length.textContent = convertMsToMinsAndSecs(remaining, true);
            elapsed.textContent = convertMsToMinsAndSecs(progress, false);
            const percentage = Math.round((progress / duration) * 100);
            scrubber.style.width = `${percentage}%`;
            if (!data.is_playing || false) {
                playIcon.classList.remove("hidden");
                pauseIcon.classList.add("hidden");
                setTimeout(() => {
                    player.classList.add("hidden");
                }, 3000)
            } else {
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                player.classList.remove("hidden");
            }
        })
        .catch(error => {
            console.error('Error fetching currently playing track:', error);
        });
    }

    setInterval(() => {
        fetchCurrentTrack();
    }, 1000);

    function playPauseTrack() {
        console.log(currentTrack.duration_ms);
        // const url = 'https://api.spotify.com/v1/me/player/play';
        // const headers = {
        //     'Authorization': `Bearer ${accessToken}`,
        //     'Content-Type': 'application/json'
        // };

        // const data = {
        //     context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
        //     offset: {
        //         position: 5
        //     },
        //     position_ms: 0
        // };

        // fetch(url, {
        //     method: 'PUT',
        //     headers: headers,
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data); // Response from the Spotify API
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    }
    
    // Play Next Track
    function playNextTrack() {
        fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .catch(error => {
            console.error('Error playing next track:', error);
        });
    }
    
    // Play Previous Track
    function playPreviousTrack() {
        fetch('https://api.spotify.com/v1/me/player/previous', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .catch(error => {
            console.error('Error playing previous track:', error);
        });
    }

    playButton.addEventListener('click', playPauseTrack);
    nextButton.addEventListener('click', playNextTrack);
    prevButton.addEventListener('click', playPreviousTrack);
})