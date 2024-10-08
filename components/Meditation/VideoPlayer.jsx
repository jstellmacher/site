'use client';
import { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { GiMusicalNotes, GiMeditation } from 'react-icons/gi';
import { FaHeadphones, FaGuitar } from 'react-icons/fa';

const VideoPlayer = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoOptions, setVideoOptions] = useState([]);
    const [showFakeYoutube, setShowFakeYoutube] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchVideoOptions = async () => {
            try {
                const response = await fetch('/videoOptions.json');
                if (response.ok) {
                    const data = await response.json();
                    setVideoOptions(data);
                } else {
                    console.error('Failed to fetch video options');
                }
            } catch (error) {
                console.error('Error fetching video options:', error);
            }
        };

        fetchVideoOptions();
    }, []);

    const handleVideoChange = (url) => {
        if (url === '') {
            setVideoUrl('');
            setIsVideoPlaying(false);
            setSelectedVideo(null);
            setShowFakeYoutube(true);
        } else {
            // Remove the autoplay parameter when setting the selected value
            setVideoUrl(url.replace('&autoplay=1', ''));
            setIsVideoPlaying(true);
            setSelectedVideo(videoOptions.find(video => video.url === url));
            setShowFakeYoutube(false);
        }
    };

    const handleVideoPlay = () => {
        if (!videoUrl) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
            return;
        }
        const newPlayingState = !isVideoPlaying; // Determine the new playing state
        setIsVideoPlaying(newPlayingState); // Update the state

        if (videoUrl) {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                const iframeSrc = iframe.src;
                iframe.src = newPlayingState 
                    ? iframeSrc.replace('autoplay=0', 'autoplay=1') 
                    : iframeSrc.replace('autoplay=1', 'autoplay=0');
            }
        }
    };

    return (
        <div className="flex flex-col h-full">
        
            {showMessage && (
                <div className="absolute top-16 left-0 right-0 bg-white text-red-500 px-4 py-2 text-center animate-fade-out z-20">
                    Try choosing a video to play instead
                </div>
            )}
            <div className="flex justify-center items-center gap-4 p-2 mt-16 z-10">
         
            <div className="flex justify-center mt-4">
                <select
                    onChange={(e) => handleVideoChange(e.target.value)}
                    value={videoUrl}
                    className="p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 text-gray-800 shadow-sm"
                >
                    <option value="">Select Background Music</option>
                    {videoOptions.map((video) => (
                        <option key={video.url} value={video.url.replace('&autoplay=1', '')}>
                            {video.title}
                        </option>
                    ))}
                </select>
            </div>
                <button
                    onClick={handleVideoPlay}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                    {isVideoPlaying ? (
                        <FaPause className="text-xl" />
                    ) : (
                        <FaPlay className="text-xl" />
                    )}
                </button>
                {selectedVideo && videoUrl && (
                    <button
                        onClick={() => window.open(`https://www.youtube.com/@${selectedVideo.channel}`, '_blank')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Follow {selectedVideo.title}
                    </button>
                )}
            </div>
            <div className="flex-grow relative">
                {showFakeYoutube ? (
                    <div className="absolute inset-0 bg-white overflow-hidden rounded-lg shadow-lg border-8 border-gray-200">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="bg-red-600 rounded-full p-6 mb-6 shadow-lg hover:bg-red-700 transition duration-300">
                                <FaHeadphones className="text-6xl text-white" />
                            </div>
                            <div className="text-center text-gray-600 mb-4">
                Note: I will add the names of all the YouTube videos eventually, but it takes a while since YouTube policy says I cannot web scrape them.
            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
                                Choose some background music to start
                                <GiMusicalNotes className="ml-2" />
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 flex items-center justify-center">
                                <GiMeditation className="mr-2" />
                                Relax and focus with soothing tunes
                                <FaGuitar className="ml-2" />
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {videoOptions.map((video) => (
                                    <button
                                        key={video.url}
                                        onClick={() => handleVideoChange(video.url)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
                                    >
                                        {video.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : videoUrl && (
                    <div className="absolute inset-0">
                        <iframe
                            src={`${videoUrl}&autoplay=1`}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
