import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Upload.css';

const Upload = () => {
    const [ file, setFile ] = useState(null);
    const [ error, setError ] = useState('');
    const [ uploading, setUploading ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ success, setSuccess ] = useState(false);

    function handleSelect(e) {
        setSuccess(false);
        setProgress(0);
        const f = e.target.files[ 0 ];
        if (!f) {
            setFile(null);
            return;
        }
        if (!f.type.startsWith('audio/')) {
            setError('Please select a valid audio file');
            setFile(null);
            return;
        }
        setError('');
        setFile(f);
    }

    async function handleUpload(e) {
        e.preventDefault();
        if (!file || uploading) return;
        setError('');
        setUploading(true);
        setProgress(0);
        try {
            const formData = new FormData();
            formData.append('audio', file);

            const result = await axios.post('http://localhost:3000/songs', formData)

            console.log(result.data);

            setSuccess(true);
            setFile(null);
            setProgress(100);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="upload-container">
            <form className="upload-card" onSubmit={handleUpload}>
                <h1 className="upload-title">Upload audio</h1>
                <label className={`dropzone ${file ? 'has-file' : ''}`}>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleSelect}
                        disabled={uploading}
                    />
                    {!file && <>
                        <svg viewBox="0 0 24 24" className="dz-icon"><path fill="currentColor" d="M12 3l4.2 4.2-1.4 1.4L13 6.8V16h-2V6.8L9.2 8.6 7.8 7.2 12 3zm-6 14h12v2H6v-2z" /></svg>
                        <span className="dz-text">Choose audio file</span>
                        <span className="dz-hint">MP3 / WAV / M4A</span>
                    </>}
                    {file && <div className="file-info">
                        <span className="file-name" title={file.name}>{file.name}</span>
                        <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>}
                </label>
                {progress > 0 && (
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }} />
                    </div>
                )}
                {error && <div className="error-msg">{error}</div>}
                {success && <div className="success-msg">Uploaded!</div>}
                <button type="submit" className="upload-btn" disabled={!file || uploading}>
                    {uploading ? 'Uploading…' : 'Upload'}
                </button>
            </form>
            <nav className="bottom-nav">
                <Link to="/" className="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                    <span>Home</span>
                </Link>
                <Link to="/upload" className="nav-item active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>
                    <span>Upload</span>
                </Link>
            </nav>
        </div>
    );
};

export default Upload;