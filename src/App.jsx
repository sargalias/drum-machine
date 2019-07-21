import React from 'react';
import 'abstracts/variables.scss';
import 'base/base.scss';
import 'base/typography.scss';
import DrumMachineInteractiveArea from 'components/DrumMachineInteractiveArea';
import Instructions from 'components/Instructions';
import audio1 from 'audio/AM_AmbiArpD120-02.wav';
import audio2 from 'audio/AM_AmbiArpD120-05.wav';
import audio3 from 'audio/AM_ConvLoop120E-01.wav';
import audio4 from 'audio/AM_ConvLoop120F-04.wav';
import audio5 from 'audio/AM_ConvLoop120F-05.wav';
import audio6 from 'audio/AM_ConvLoop120G-04.wav';
import audio7 from 'audio/AM_GuitVerber120A-01.wav';
import audio8 from 'audio/AM_GuitVerber120A-02.wav';

const drumPads = [
  {
    letter: 'Q',
    audioSrc: audio1,
  },
  {
    letter: 'W',
    audioSrc: audio2,
  },
  {
    letter: 'E',
    audioSrc: audio3,
  },
  {
    letter: 'R',
    audioSrc: audio4,
  },
  {
    letter: 'A',
    audioSrc: audio5,
  },
  {
    letter: 'S',
    audioSrc: audio6,
  },
  {
    letter: 'D',
    audioSrc: audio7,
  },
  {
    letter: 'F',
    audioSrc: audio8,
  },
];

const App = () => (
  <div>
    <h1>Drum machine</h1>
    <DrumMachineInteractiveArea drumPads={drumPads} />
    <Instructions />
  </div>
);

export default App;
