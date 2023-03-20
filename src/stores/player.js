import { defineStore } from "pinia";
import { Howl } from "howler"; // use to create a new audio object

export default defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
  }),
  actions: {
    async newSong(song) {
      // if already have a song playing, reset the audio then play the new song
      // check if there is already a sound being played
      if (this.sound.playing) {
        this.sound.stop();
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true, // by default, howler uses ajax request to load audio files, because audio stored in external server, we need to use html5 to load audio
      });

      // play the audio
      this.sound.play();
    },
    async toggleAudio() {
      // if doesn't have any song playing, return
      if (!this.sound.playing) {
        // omit the () so don't call the function
        return;
      }

      // this.sound.playing() will return true if the audio is playing
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
  },
  getters: {
    playing: (state) => {
      if (!state.sound.playing) {
        return false;
      } else {
        return state.sound.playing();
      }
    },
  },
});
