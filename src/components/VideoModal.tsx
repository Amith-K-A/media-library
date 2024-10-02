// components/VideoModal.tsx

import React from 'react';
import Modal from 'react-modal';
import { formatDuration } from '../helpers/helpers';
// components/VideoModal.tsx

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
    className=" inset-0 grid place-self-center w-fit h-fit p-4"
    overlayClassName="fixed flex justify-center inset-0 bg-black bg-opacity-75"
    shouldCloseOnOverlayClick={true}
  >
    {video && (
      <div className="bg-white rounded-lg overflow-hidden w-[135vh]">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Video Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="relative h-[85vh] flex justify-center items-center overflow-hidden">
          <video className="w-full h-full object-contain" controls autoPlay src={video.videoFile}></video>
        </div>
        <div className="p-4 flex justify-between items-center">
          <p className="text-sm font-medium">Duration: {formatDuration(video.duration)}</p>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Collect</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Like</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Free Download</button>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default VideoModal;
