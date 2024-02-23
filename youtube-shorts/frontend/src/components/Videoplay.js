// src/components/VideoPlay.js
import React, { useRef, useState, useEffect } from 'react'; // Importing necessary hooks from React
import { Grid } from '@mui/material'; // Importing Grid component from Material-UI
import { useSwipeable } from 'react-swipeable'; // Importing useSwipeable hook from react-swipeable library
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import './i.css';
// VideoPlay component definition
const VideoPlay = ({ videoUrl, title }) => {
  const videoRef = useRef(null); // Creating a reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track whether the video is playing

  // Function to handle play/pause of the video
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play(); // If video is paused, play it
      setIsPlaying(true); // Set isPlaying state to true
    } else {
      videoRef.current.pause(); // If video is playing, pause it
      setIsPlaying(false); // Set isPlaying state to false
    }
  };
  useEffect(() => {
    // Accessing the current property to get the DOM node
    const videoElement = videoRef.current;

    if (videoElement) {
      // Ensure video is muted
      // videoElement.muted = true;
      videoElement.autoplay=true;
      // Autoplay
      videoElement.play().catch(error => {
        // Autoplay was prevented
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);
  // Effect to handle visibility change of the document
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) { // If document becomes hidden (e.g., user switches tabs)
        videoRef.current.pause(); // Pause the video
        setIsPlaying(false); // Set isPlaying state to false
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange); // Add event listener for visibility change

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange); // Remove event listener when component unmounts
    };
  }, []);

  // Swipe handlers for swipe gestures
  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === 'Up' || eventData.dir === 'Down') { // If swipe up or down
        videoRef.current.pause(); // Pause the video
        setIsPlaying(false); // Set isPlaying state to false
      }
    }
  });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideoIndex1, setCurrentVideoIndex1] = useState(0);
  const handletah = () => {
    // Logic to change the value of currentVideoIndex
    // For example, incrementing it by 1
    if (currentVideoIndex < videoUrl.length - 1) {
    setCurrentVideoIndex(prevIndex => prevIndex + 1);}
    else{
      setCurrentVideoIndex(0)
    }
  };
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop === 0) {
      // User has scrolled to the top
      if (currentVideoIndex > 0) {
        setCurrentVideoIndex(prevIndex => prevIndex - 1);
        setCurrentVideoIndex1(prevIndex => prevIndex - 1);
      }
    } else if (scrollTop + clientHeight >= scrollHeight - 1) {
      // User has scrolled to the bottom
      if (currentVideoIndex < videoUrl.length - 1) {
        setCurrentVideoIndex(prevIndex => prevIndex + 1);
        setCurrentVideoIndex1(prevIndex => prevIndex + 1);
      }
     
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentVideoIndex, videoUrl.length]);
  

  // Function to handle key down events
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { // If arrow up or down is pressed
      videoRef.current.pause(); // Pause the video
      setIsPlaying(false); // Set isPlaying state to false
    }
  };

  // Rendering the VideoPlay component
  return (
    <>
      <Grid container lg={12} xs={12}> {/* Container for the video */}
        <Grid container lg={12} xs={12} sx={{ margin: 'auto' }}> {/* Container for centering */}
          <div className="video-player"   style={{overflowY:'hidden'}}> {/* Div containing video and swipe handlers */}
          {/* <p>{currentVideoIndex}</p> */}
            <video autoplay  muted
              ref={videoRef} 
              src={`${videoUrl[currentVideoIndex]}`} 
              controls 
              onClick={handlePlayPause} 
              onEnded={() => setIsPlaying(false)} style={{ 
                position: 'fixed', 
                width: '100%', 
                height: '100%', 
                top: 0, 
                left: 0, 
                objectFit: 'cover' 
            }} 
               />
               
             
               <button  className="visible-button" style={{position:'absolute',top:'90%',left:'80%'}} onClick={handletah}><ExpandCircleDownOutlinedIcon/></button>
            {/* <div className="video-info"> Container for video title and play/pause button
              <h3>{`${title[currentVideoIndex1]}`}</h3> Video title
              <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button> Play/pause button
            </div> */}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoPlay; // Exporting the VideoPlay component
