import React from 'react';
import { Play, Eye } from 'lucide-react';
import type { VideoDetails } from '../types';

interface VideoCardProps {
  video: VideoDetails;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {video.title}
        </h2>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span>{video.channelTitle}</span>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{video.viewCount} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}