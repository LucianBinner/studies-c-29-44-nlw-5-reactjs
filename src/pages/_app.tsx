import '../styles/global.scss';

import Header from '../components/Header';
import Player from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';



function MyApp({ Component, pageProps }) {
  const [episodeList, setEspisodeList] = useState([]);
  const [currentEpisodeIndex, setEcurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEspisodeList([episode])
    setEcurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  };

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  };


  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, tooglePlay, setPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
