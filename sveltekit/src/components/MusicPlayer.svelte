<script lang="typescript" context="module">
    import { browser } from "$app/environment";

    export enum Sounds {
        Beep,
        Dial,
        Melancholy,
        Ping,
        Ringtone,
        Telephone,
        UiCorrect,
        UiClick,
        UserInterface,
    }

    const sources: [string, number, number][] = [
        ["/sounds/beep.mp3", 25, 400],
        ["/sounds/dial.mp3", 0, 0],
        ["/sounds/melancholy-ui-chime.mp3", 0, 0],
        ["/sounds/ping.mp3", 0, 0],
        ["/sounds/ringtone.mp3", 0, 0],
        ["/sounds/telephone-connect.mp3", 0, 0],
        ["/sounds/ui_correct_button.mp3", 0, 0],
        ["/sounds/ui-click.mp3", 0, 0],
        ["/sounds/userinterface.mp3", 0, 0],
    ];
    
    let audio: HTMLAudioElement | undefined;
    let isPlaying = false;
    let playTimeout = 0;

    if (browser) {
        audio = new Audio();
        audio.volume = 0.5;
        audio.preload = "auto";
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("canplaythrough", onCanPlay);
    }

    export function playSound(sound: Sounds) {
        if (!audio || isPlaying) return;
        const [path, from, to] = sources[sound];
        if (audio.currentSrc === path) {
            onCanPlay();
            return;
        }
        audio.src = path;
        audio.currentTime = from;
        playTimeout = to - from;
        //audio.load();
    }

    function onCanPlay() {
        if (!audio || isPlaying) return;
        audio.play();
        isPlaying = true;
        setTimeout(() => audio?.pause(), playTimeout);
    }

    function onEnded() {
        isPlaying = false;
    }
</script>