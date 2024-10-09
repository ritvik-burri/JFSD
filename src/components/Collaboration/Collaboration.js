import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ChatIcon from '@mui/icons-material/Chat';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const ChatBox = styled(Box)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '12px',
  height: '300px',
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: '#f7f9fc',
  boxShadow: 'inset 0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const MessageAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#42a5f5',
  marginRight: theme.spacing(2),
}));

const FileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: '#e3f2fd',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
}));

const Collaboration = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/collaboration/message',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, { sender: 'You', content: message }]);
      setMessage('');
      enqueueSnackbar('Message sent!', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to send message.', { variant: 'error' });
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 1000);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/collaboration/upload', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setFiles([...files, { filename: file.name, url: '#' }]); // Replace '#' with actual file URL from response
      setFile(null);
      enqueueSnackbar('File uploaded!', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to upload file.', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Collaboration Workspace
        </Typography>
      </Box>

      {/* Collaboration Chat and File Sharing Sections */}
      <Grid container spacing={4}>
        {/* Chat Section */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Project Chat
            </Typography>

            {/* Chatbox */}
            <ChatBox>
              <List>
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <MessageAvatar>
                        <ChatIcon />
                      </MessageAvatar>
                      <ListItemText primary={msg.sender} secondary={msg.content} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              {/* Typing Indicator */}
              {typing && (
                <Box display="flex" alignItems="center" mt={2}>
                  <CircularProgress size={24} />
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Someone is typing...
                  </Typography>
                </Box>
              )}
            </ChatBox>

            {/* Input for Chat */}
            <Box display="flex" mt={2}>
              <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={handleTyping}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{ ml: 2, textTransform: 'none' }}
              >
                Send
              </Button>
            </Box>
          </StyledPaper>
        </Grid>

        {/* File Sharing Section */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              File Sharing
            </Typography>

            {/* File Upload */}
            <Box display="flex" alignItems="center" mb={2}>
              <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
                Upload File
                <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                sx={{ ml: 2 }}
                disabled={!file}
              >
                Upload
              </Button>
              {file && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {file.name}
                </Typography>
              )}
            </Box>

            {/* File List */}
            <Box>
              {files.length > 0 ? (
                files.map((f, index) => (
                  <FileCard key={index}>
                    <ListItemText
                      primary={f.filename}
                      secondary={
                        <a href={f.url} target="_blank" rel="noopener noreferrer">
                          Download
                        </a>
                      }
                    />
                  </FileCard>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No files uploaded yet.
                </Typography>
              )}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Collaboration;
