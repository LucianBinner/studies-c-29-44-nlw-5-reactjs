import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    tooglePlay: () => void;
    toogleLoop: () => void;
    toogleShuff: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEspisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEspisodeList([episode])
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function tooglePlay() {
        setIsPlaying(!isPlaying);
    };

    function toogleLoop() {
        setIsLooping(!isLooping);
    };

    function toogleShuff() {
        setIsShuffling(!isShuffling);
    };

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    };

    function playList(list: Episode[], index: number) {
        setEspisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;


    function playNext() {
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }    
    }

    function playPrevious() {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }    
    }

    function clearPlayerState() {
        setEspisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play, 
            isPlaying,
            isLooping,
            isShuffling,
            playList,
            playNext,
            playPrevious,
            tooglePlay,
            toogleLoop,
            toogleShuff,
            setPlayingState,
            hasPrevious,
            hasNext,
            clearPlayerState,
        }}>
            {children}
        </ PlayerContext.Provider>
    )
}

export const usePlayer = () => useContext(PlayerContext);