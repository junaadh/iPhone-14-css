const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

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
const spotifyBtn = document.getElementById('spotify');

const batteryPer = document.getElementById('battery-percentage');
const batteryTip = document.getElementById('battery-tip');
const batteryIndicator = document.getElementById('battery-indicator');
const chargingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="white" class="absolute top-[4px] left-[14px]" viewBox="0 0 16 16">
<path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
</svg>`;

// setup app from spotify dev dashboard
// replace your client id here
const clientId = '5f56ac4110084091bcd953a152dd05a7';

// setup redirect uri in spotify dev dashboard
const redirectUri = window.location.href.split('#')[0];
const scopes = ['user-read-playback-state', 'user-read-currently-playing', 'user-modify-playback-state'];

// format date
const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };
const currentDate = new Date().toLocaleDateString(undefined, dateFormat);
dateElement.textContent = currentDate;

// format time
const currentTime = new Date();
const hours = String(currentTime.getHours()).padStart(2, '0'); // Get hours in 2-digit format
const minutes = String(currentTime.getMinutes()).padStart(2, '0'); // Get minutes in 2-digit format
const formattedTime = `${hours}:${minutes}`;
timeElement.textContent = formattedTime;

// set an eventlistner to listen for DOMcontentfullyloaded
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


    // add event click listner to power button
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

    // adds event click listner to mute button
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

            // wait 3.5s before hiding banner
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

            // wait 3.5s before hiding banner
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

    // spotify and music player controls

    // url to authorize spotify and get access token
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);

    // check the url and gets the token every 1 hr
    if (window.location.href.includes('access_token')) {
        setTimeout(() => {
            window.location.href = url;
        }, 3600000)
    }

    // redirect to spotify for authentication
    spotifyBtn.addEventListener('click', () => {
        if (window.location.href.includes('access_token')) {
            window.history.replaceState({}, document.title, window.location.href.split("#")[0]);
        } else {
            window.location.href = url;
        }
    })

    // Check if the URL contains an access_token parameter
    let accessToken;
    if (window.location.href.includes('access_token')) {
        accessToken = window.location.href.split('#')[1].split('=')[1].split('&')[0];
    }
    // console.log(accessToken);

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
            // const jsonData = JSON.parse(data);
            if (!data.item) {
                console.log('No track currently playing.');
                return;
            }
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
            const playing = data.is_playing === true ? true : false;
            if (!playing) {
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

    function playPauseTrack() {
        // TODO: //
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

    function getBatteryLevel() {
        navigator.getBattery()
            .then((battery) => {
                const level = Math.round(battery.level * 100);
                const isCharging = battery.charging;
                batteryPer.innerHTML = isCharging && level != 100 ? level + chargingSvg : level;
                batteryIndicator.style.width = `${level}%`;
                if (isCharging) {
                    batteryIndicator.classList.add('bg-green-400');
                    batteryPer.classList.remove('text-slate-600');
                    batteryPer.classList.remove('left-[325px]');
                    if (level === 100) {
                        batteryTip.classList.remove('bg-gray-400/90');
                        batteryTip.classList.add('bg-green-400');
                    } else {
                        batteryPer.classList.add('left-[323px]');
                        batteryPer.classList.add('text-white');
                    }
                    // batteryTip.classList.add('bg-green-400');
                } else {
                    batteryIndicator.classList.remove('bg-green-400');
                    batteryPer.classList.add('text-slate-600');
                    batteryPer.classList.add('left-[325px]');
                    if (level === 100) {
                        batteryTip.classList.add('bg-gray-400/90');
                        batteryTip.classList.remove('bg-green-400');
                    } else {
                        batteryPer.classList.remove('left-[323px]');
                        batteryPer.classList.remove('text-white');
                    }
                }
                if (level === 100) {
                    batteryPer.classList.add('left-[321px]');
                    batteryIndicator.classList.add('rounded-r-[5px]');
                } else {
                    batteryPer.classList.remove('left-[321px]');
                    batteryIndicator.classList.remove('rounded-r-[5px]');
                }

            })
    }

    setInterval(() => {
        if (window.location.href.includes('access_token')) {
            fetchCurrentTrack();
        }
        getBatteryLevel();
    }, 1000);
})