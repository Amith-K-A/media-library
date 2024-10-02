import React from 'react';
import Modal from 'react-modal';
import { formatDuration } from '../helpers/helpers';
import { Video } from '../types/Video';

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, video, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="inset-0 grid place-self-center w-fit h-fit p-4 focus:outline-none"
    overlayClassName="fixed flex justify-center inset-0 bg-black bg-opacity-75"
    shouldCloseOnOverlayClick={true}
  >
    {video && (
      <div className="bg-white rounded-lg overflow-hidden w-[135vh]">
        {/* Header Section */}
        <div className="p-4 flex justify-between items-center border-b bg-white">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <img
              src={video.image}
              alt="Uploader avatar"
              className="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <span className="font-bold text-lg">
                {video.user.name}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 w-[30px]">✕</button>
        </div>

        {/* Video Section */}
        <div className="relative h-[85vh] flex justify-center items-center overflow-hidden">
          <video className="w-full h-full object-contain" controls autoPlay src={video.videoFile}></video>
        </div>

        {/* Footer Section */}
        <div className="p-4 flex justify-between items-center border-t h-[80px]">
          <p className="text-sm font-medium">Duration: {formatDuration(video.duration)}</p>
          <div className="space-x-4">
            {/* Updated Free Download Button */}
            <a 
              href={video.videoFile} // Link to the video file
              download // This attribute tells the browser to download the file
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Free Download
            </a>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default VideoModal;
