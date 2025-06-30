import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendMessage, fetchMessages } from '@/features/chat/chatSlice';

const ChatBox = ({ receiverId = null, groupId = null }) => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    dispatch(
      sendMessage({
        senderId: user?._id,
        receiverId,
        groupId,
        content,
      })
    );
    setContent('');
  };

  useEffect(() => {
    if (groupId) {
      dispatch(fetchMessages({ groupId }));
    } else if (user?._id && receiverId) {
      dispatch(fetchMessages({ userId: user._id, otherUserId: receiverId }));
    }
  }, [dispatch, groupId, receiverId, user]);

  return (
    <div className="w-full h-full flex flex-col border rounded-xl p-4 bg-white shadow-md">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-xs px-4 py-2 rounded-xl ${
                msg.sender._id === user._id
                  ? 'bg-blue-500 text-white ml-auto'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {msg.sender.name}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
