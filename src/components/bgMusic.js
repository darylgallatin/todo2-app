// src/utils/bgMusic.js
let bgMusic = null;
import  bgmusic_Dance from './penguin_dance.mp3'

export function startBgMusic() {
  // If the Audio instance hasn't been created yet, create it.
  if (!bgMusic) {
    bgMusic = new Audio(bgmusic_Dance); // Adjust the path as needed
    
    bgMusic.loop = true; // Loop the music continuously
    bgMusic.volume = 0.2; // Set volume to 50%
  }
  // If the music is paused (or hasn't started), play it.
  if (bgMusic.paused) {
    
    bgMusic.play();
    
  }
}