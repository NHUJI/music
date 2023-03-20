// use to store utility functions for assisting the app with basic tasks

export default {
  formatTime(time) {
    // convert time to minutes and seconds
    const minutes = Math.floor(time / 60) || 0; // if result is undefined or NaN, return 0
    const seconds = Math.round(time - minutes * 60) || 0;

    // return formatted time with leading zero if necessary
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  },
};
