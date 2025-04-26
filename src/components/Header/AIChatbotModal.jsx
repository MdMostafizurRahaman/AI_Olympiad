import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
import { Mycontext } from '../../App.jsx';

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

const AIChatbotModal = ({ open, onClose }) => {
  const { currentLocationData } = useContext(Mycontext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);
  
  // Position and size state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const chatContainerRef = useRef(null);
  const dialogRef = useRef(null);

  // Handle keyboard input for sending messages
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default Enter behavior
      handleSendMessage();
    }
  };

  // Dragging functionality
  const handleMouseDown = (e) => {
    if (e.target.closest('.MuiDialogTitle-root')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  // Resizing functionality
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      left: position.x,
      top: position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      e.preventDefault();
      
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;

      switch (resizeDirection) {
        case 'e':
          newWidth = Math.max(MIN_WIDTH, dragStart.width + deltaX);
          break;
        case 'w':
          newWidth = Math.max(MIN_WIDTH, dragStart.width - deltaX);
          newX = dragStart.left + (dragStart.width - newWidth);
          break;
        case 's':
          newHeight = Math.max(MIN_HEIGHT, dragStart.height + deltaY);
          break;
        case 'n':
          newHeight = Math.max(MIN_HEIGHT, dragStart.height - deltaY);
          newY = dragStart.top + (dragStart.height - newHeight);
          break;
        case 'se':
          newWidth = Math.max(MIN_WIDTH, dragStart.width + deltaX);
          newHeight = Math.max(MIN_HEIGHT, dragStart.height + deltaY);
          break;
        case 'sw':
          newWidth = Math.max(MIN_WIDTH, dragStart.width - deltaX);
          newHeight = Math.max(MIN_HEIGHT, dragStart.height + deltaY);
          newX = dragStart.left + (dragStart.width - newWidth);
          break;
        case 'ne':
          newWidth = Math.max(MIN_WIDTH, dragStart.width + deltaX);
          newHeight = Math.max(MIN_HEIGHT, dragStart.height - deltaY);
          newY = dragStart.top + (dragStart.height - newHeight);
          break;
        case 'nw':
          newWidth = Math.max(MIN_WIDTH, dragStart.width - deltaX);
          newHeight = Math.max(MIN_HEIGHT, dragStart.height - deltaY);
          newX = dragStart.left + (dragStart.width - newWidth);
          newY = dragStart.top + (dragStart.height - newHeight);
          break;
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (open) {
      setIsInitialMessageSent(false); // Reset when modal opens
    }
  }, [open]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeDirection]);

  // Initial message setup
  useEffect(() => {
    if (!isInitialMessageSent && open && currentLocationData?.location) {
      const initialMessage = `আমার বর্তমান অবস্থান ${currentLocationData.location}। এখানে তাপমাত্রা ${currentLocationData.temperature}°C, AQI ${currentLocationData.aqi}, এবং আর্দ্রতা ${currentLocationData.humidity}%। এখন আমার কোন ধরনের সেফটি গ্রহণ করা উচিত?`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: initialMessage, sender: 'user' },
        { text: 'Thinking...', sender: 'ai', isThinking: true },
      ]);

      generateAIResponse(initialMessage);
      setIsInitialMessageSent(true);
    }
  }, [open,currentLocationData, isInitialMessageSent]);

  // Generate AI response
  const generateAIResponse = async (message) => {
    setIsGeneratingAnswer(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: message }] }],
        },
      });

      const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't process that.";
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.isThinking ? { text: aiResponse, sender: 'ai' } : msg
        )
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.isThinking
            ? { text: 'Sorry - Something went wrong. Please try again!', sender: 'ai' }
            : msg
        )
      );
    }
    setIsGeneratingAnswer(false);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: 'user' },
      { text: 'AI Thinking...', sender: 'ai', isThinking: true },
    ]);
    await generateAIResponse(inputMessage);
    setInputMessage('');
  };

  // Autoscroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isGeneratingAnswer]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={false}
      ref={dialogRef}
      PaperProps={{
        style: {
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          transition: (isDragging || isResizing) ? 'none' : 'transform 0.3s ease-in-out',
          cursor: isDragging ? 'grabbing' : 'default',
          position: 'absolute'
        },
        onMouseDown: handleMouseDown
      }}
      style={{ pointerEvents: 'none' }}
      BackdropProps={{ style: { pointerEvents: 'none' } }}
      className="draggable-resizable-dialog"
    >
      {/* Resize handles */}
      <div className="resize-handle n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="resize-handle e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
      <div className="resize-handle s" onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="resize-handle w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="resize-handle se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
      <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />

      <DialogTitle className="chatbot-title cursor-grab">
        <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
      </DialogTitle>
      <DialogContent dividers style={{ height: 'calc(100% - 120px)' }}>
        <div ref={chatContainerRef} className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === 'user' ? 'user-message' : 'ai-message'
              }`}
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="input-container1">
          <TextField
            id="text-field"
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isGeneratingAnswer}
          />
          <Button
            color="primary"
            onClick={handleSendMessage}
            className="send-button"
            disabled={inputMessage.trim() === '' || isGeneratingAnswer}
          >
            {isGeneratingAnswer ? <CircularProgress size={20} /> : <RiSendPlaneFill />}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AIChatbotModal;