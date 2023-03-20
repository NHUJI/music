import { defineStore } from "pinia";

import { Howl } from "howler"; // use to create a new audio object
import helper from "@/includes/helper";

export default defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
    seek: "00:00", // current time of the audio, use this name because it's the same name in Howler
    duration: "00:00", // total duration of the audio
    playerProgress: "0%", // progress bar of the audio
  }),
  actions: {
    async newSong(song) {
      // if already have a song playing, reset the audio then play the new song
      // check if there is already a sound being played ,alternatively, we can use this.sound.playing
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true, // by default, howler uses ajax request to load audio files, because audio stored in external server, we need to use html5 to load audio
      });

      // play the audio
      this.sound.play();

      // Listen to the play event, event when pause then play again, it will still trigger this event
      this.sound.on("play", () => {
        requestAnimationFrame(this.progress); //is similar to setInterval, but it will only run when the browser is ready to render a new frame
      });
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
    // this will commit a mutation to update the seek and duration
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      // update the progress bar, use toFixed to round the number to 10 decimal places
      this.playerProgress = `${(
        (this.sound.seek() / this.sound.duration()) *
        100
      ).toFixed(10)}%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress); // recursive call
      }
    },
    // vue alaways pass the event object to the function
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }
      const { x, width } =
        event.currentTarget.getBoundingClientRect(); // get the position of the Scrub Container, x represent the distance from the left of the doc to the left of the player (Scrub Container)
      const clickX = event.clientX - x; // we only care about the x position, but it based on the whole window, not the Scrub Container
      const percentage = clickX / width; // get the song progress percentage
      const seconds = this.sound.duration() * percentage; // get the song progress in seconds to change the seek

      this.sound.seek(seconds); // seek can get the current time of the audio, but it can also set the current time of the audio

      this.sound.once("seek", this.progress); // listen to the seek event change, then update the progress bar even when the audio is paused
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
