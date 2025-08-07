import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import axios from 'axios';


const Home = () => {

    const [ songs, setSongs ] = useState([
        { title: 'Midnight Serenade', year: 2023, artist: 'Olivia Carter', thumbnail: 'https://via.placeholder.com/56' },
    ])

    const [ currentSongPlaying, setCurrentSongPlaying ] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/songs")
            .then(response => {
                console.log(response.data);
                setSongs(response.data.songs)
            })
    }, [])

    console.log(currentSongPlaying);

    return (
        <div className="home-container">
            <div className="song-list">
                {songs.map((song, index) => (
                    <div className="song-item" key={index}>
                        <img src={song.coverImage} alt={`${song.title} thumbnail`} className="song-thumbnail" />
                        <div className="song-info">
                            <h2 className="song-title">{song.title}</h2>
                            <p className="song-details">{song.releaseDate}</p>
                            <p className="song-details">{song.artist}</p>
                        </div>
                        <button
                            onClick={() => {
                                if (currentSongPlaying === song._id) {
                                    setCurrentSongPlaying(null);
                                    return;
                                }
                                setCurrentSongPlaying(song._id);
                            }}
                            className="play-button">
                            {currentSongPlaying === song._id ? (
                                <svg
                                    className='play-icon'
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" /></svg>
                            ) : (
                                <svg className="play-icon" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {
                            currentSongPlaying === song._id &&
                            <audio
                                playsInline
                                controls
                                autoPlay
                                style={{ display: 'none' }} src={song.audioUrl}></audio>
                        }

                    </div>
                ))}
            </div>
            <nav className="bottom-nav">
                <Link to="/" className="nav-item active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/upload" className="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                    </svg>
                    <span>upload</span>
                </Link>
            </nav>
        </div>
    );
};

export default Home;