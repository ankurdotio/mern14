import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const songs = [
    { title: 'Midnight Serenade', year: 2023, artist: 'Olivia Carter', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'City Lights', year: 2023, artist: 'Ethan Bennett', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Ocean Breeze', year: 2023, artist: 'Sophia Hayes', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Mountain Echoes', year: 2023, artist: 'Liam Foster', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Desert Mirage', year: 2023, artist: 'Ava Harper', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Forest Whispers', year: 2023, artist: 'Noah Reed', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'River Flow', year: 2023, artist: 'Isabella Clark', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Starry Night', year: 2023, artist: 'Jackson Cole', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Rainy Days', year: 2023, artist: 'Mia Turner', thumbnail: 'https://via.placeholder.com/56' },
    { title: 'Sunrise Glow', year: 2023, artist: 'Lucas Hill', thumbnail: 'https://via.placeholder.com/56' },
];

const Home = () => {
    return (
        <div className="home-container">
            <div className="song-list">
                {songs.map((song, index) => (
                    <div className="song-item" key={index}>
                        <img src={song.thumbnail} alt={`${song.title} thumbnail`} className="song-thumbnail" />
                        <div className="song-info">
                            <h2 className="song-title">{song.title}</h2>
                            <p className="song-details">{song.year}</p>
                            <p className="song-details">{song.artist}</p>
                        </div>
                        <button className="play-button">
                            <svg className="play-icon" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
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