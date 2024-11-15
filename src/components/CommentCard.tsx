import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import type { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
  rank: number;
}

export function CommentCard({ comment, rank }: CommentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={comment.avatar}
            alt={comment.author}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">{comment.author}</h3>
              <span className="text-sm text-gray-500">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              #{rank}
            </div>
          </div>
          <p className="mt-2 text-gray-600">{comment.text}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}