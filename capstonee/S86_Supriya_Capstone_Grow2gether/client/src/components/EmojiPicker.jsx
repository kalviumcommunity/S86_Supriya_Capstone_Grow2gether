import React, { useState } from 'react';

// Predefined emojis you want to support (can be expanded)
const emojiList = ['😀', '😂', '🥳', '😢', '😎', '🤔', '😴', '😡', '❤️', '🔥'];

const EmojiPicker = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-xl px-2 py-1 rounded hover:bg-gray-200 transition"
        title="Pick Emoji"
      >
        😊
      </button>

      {open && (
        <div className="absolute bottom-10 left-0 grid grid-cols-5 gap-2 p-3 bg-white border rounded-lg shadow-md z-10">
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className="text-2xl hover:scale-125 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
