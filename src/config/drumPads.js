/* eslint-disable camelcase */

import ambiArpD120_2 from 'audio/AM_AmbiArpD120-02-trimmed.wav';
import ambiArpD120_5 from 'audio/AM_AmbiArpD120-05-trimmed.wav';
import convLoop120E_1 from 'audio/AM_ConvLoop120E-01-trimmed.wav';
import convLoop120F_4 from 'audio/AM_ConvLoop120F-04-trimmed.wav';
import convLoop120F_5 from 'audio/AM_ConvLoop120F-05-trimmed.wav';
import convLoop120G_4 from 'audio/AM_ConvLoop120G-04-trimmed.wav';
import guitVerber120A_1 from 'audio/AM_GuitVerber120A-01-trimmed.wav';
import guitVerber120A_2 from 'audio/AM_GuitVerber120A-02-trimmed.wav';

const drumPads = [
  {
    letter: 'Q',
    audioSrc: ambiArpD120_2,
    soundName: 'Ambience Arp D120 2',
  },
  {
    letter: 'W',
    audioSrc: ambiArpD120_5,
    soundName: 'Ambience Arp D120 5',
  },
  {
    letter: 'E',
    audioSrc: convLoop120E_1,
    soundName: 'Convoluted loop 120E 1',
  },
  {
    letter: 'R',
    audioSrc: convLoop120F_4,
    soundName: 'Convoluted loop 120F 4',
  },
  {
    letter: 'A',
    audioSrc: convLoop120F_5,
    soundName: 'Convoluted loop 120F 5',
  },
  {
    letter: 'S',
    audioSrc: convLoop120G_4,
    soundName: 'Convoluted loop 120G 4',
  },
  {
    letter: 'D',
    audioSrc: guitVerber120A_1,
    soundName: 'Guitar Verberation 120A 1',
  },
  {
    letter: 'F',
    audioSrc: guitVerber120A_2,
    soundName: 'Guitar Verberation 120A 2',
  },
];

export default drumPads;
