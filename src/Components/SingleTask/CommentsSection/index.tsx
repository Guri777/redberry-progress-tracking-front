import React from 'react';
import { Comment } from '@/types';
import { Box, Avatar, Typography, Button } from '@mui/material';

interface CommentSectionProps {
  comments: Comment[];
  onReply: (id: string, author: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onReply,
}) => (
  <>
    {comments.map((comment) => (
      <Box key={comment.id} mt={3}>
        <Box display='flex' alignItems='center'>
          <Avatar
            src={comment.author_avatar}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant='subtitle1' fontWeight='bold'>
              {comment.author_nickname}
            </Typography>
            <Typography color='text.secondary'>{comment.text}</Typography>
          </Box>
        </Box>
        <Button
          onClick={() => onReply(comment.id, comment.author_nickname)}
          sx={{
            ml: 7,
            my: 0.5,
            color: 'var(--primary)',
            fontFamily: "'Noto Sans Georgian', Arial, sans-serif",
          }}
        >
          უპასუხე
        </Button>
        {comment.sub_comments.map((subComment) => (
          <Box
            key={subComment.id}
            mt={1}
            ml={7}
            display='flex'
            alignItems='center'
          >
            <Avatar
              src={subComment.author_avatar}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography variant='subtitle1' fontWeight='bold'>
                {subComment.author_nickname}
              </Typography>
              <Typography color='text.secondary'>{subComment.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    ))}
  </>
);

export default CommentSection;
