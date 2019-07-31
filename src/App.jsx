/* eslint-disable camelcase */
import React from 'react';
import 'abstracts/variables.scss';
import 'base/base.scss';
import 'base/typography.scss';
import DrumMachineInteractiveArea from 'components/DrumMachineInteractiveArea';
import Instructions from 'components/Instructions';
import ambiArpD120_2 from 'audio/AM_AmbiArpD120-02.wav';
import ambiArpD120_5 from 'audio/AM_AmbiArpD120-05.wav';
import convLoop120E_1 from 'audio/AM_ConvLoop120E-01.wav';
import convLoop120F_4 from 'audio/AM_ConvLoop120F-04.wav';
import convLoop120F_5 from 'audio/AM_ConvLoop120F-05.wav';
import convLoop120G_4 from 'audio/AM_ConvLoop120G-04.wav';
import guitVerber120A_1 from 'audio/AM_GuitVerber120A-01.wav';
import guitVerber120A_2 from 'audio/AM_GuitVerber120A-02.wav';

const drumPads = [
  {
    letter: 'Q',
    audioSrc: ambiArpD120_2,
  },
  {
    letter: 'W',
    audioSrc: ambiArpD120_5,
  },
  {
    letter: 'E',
    audioSrc: convLoop120E_1,
  },
  {
    letter: 'R',
    audioSrc: convLoop120F_4,
  },
  {
    letter: 'A',
    audioSrc: convLoop120F_5,
  },
  {
    letter: 'S',
    audioSrc: convLoop120G_4,
  },
  {
    letter: 'D',
    audioSrc: guitVerber120A_1,
  },
  {
    letter: 'F',
    audioSrc: guitVerber120A_2,
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
