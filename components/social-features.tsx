"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Send, MoreHorizontal, Flag } from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: Date
  likes: number
  isLiked: boolean
}

interface SocialFeaturesProps {
  itemId: string
  itemType: "session" | "model"
  likes: number
  isLiked: boolean
  onLike: () => void
  onShare: () => void
}

export default function SocialFeatures({ itemId, itemType, likes, isLiked, onLike, onShare }: SocialFeaturesProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        username: "@sarahj",
      },
      content:
        "This is absolutely stunning! The lighting and composition are perfect. How did you achieve that realistic shadow effect?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        username: "@mikechen",
      },
      content: "Love the minimalist approach! This would look great in my living room. Can you share the model files?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8,
      isLiked: true,
    },
    {
      id: "3",
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        username: "@emmaw",
      },
      content: "The attention to detail is incredible. Every texture looks so realistic!",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 15,
      isLiked: false,
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "@you",
        },
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment,
      ),
    )
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-600"}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span>{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{comments.length}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={onShare} className="flex items-center space-x-2 text-gray-600">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Add Comment */}
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{comment.user.username}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(comment.id)}
                        className={`text-xs ${comment.isLiked ? "text-red-500" : "text-gray-500"}`}
                      >
                        <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                        {comment.likes > 0 && comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        <Flag className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
