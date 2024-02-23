import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import VideoPlay from './components/Videoplay';
import video1 from './assets/videos/Video1.mp4'
import video2 from './assets/videos/Video2.mp4'
import video3 from './assets/videos/Video3.mp4'
import video4 from './assets/videos/Video4.mp4'
import video5 from './assets/videos/Video5.mp4'
import video6 from './assets/videos/Video6.mp4'
import video7 from './assets/videos/Video7.mp4'
import video8 from './assets/videos/Video8.mp4'

function App() {
  const videoss=[video1,video2,video3,video4,video5,video6,video7,video8]
  const title=['video','video2','video3','video4','video5','video6','video7','video8' ]
  return (
    <>
     <Routes>
     <Route path="/" element={<VideoPlay videoUrl={videoss} title={title} />} />


       
      </Routes>
    </>
  );
}

export default App;
