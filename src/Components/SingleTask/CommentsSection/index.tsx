import React, { useState } from 'react';
import { Comment } from '@/types';
import { Box, Avatar, Typography, Button } from '@mui/material';

interface CommentSectionProps {
  comments: Comment[];
  onReply: (id?: string, author?: string) => void;
  selectedCommentId: string | null;
  setSelectedCommentId: (selectedCommentId: string | null) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onReply,
  selectedCommentId,
  setSelectedCommentId,
}) => {
  const handleReplyClick = (id: string, author: string) => {
    setSelectedCommentId(id === selectedCommentId ? null : id); // ტოგლი არჩეული კომენტარის ID
    if (id === selectedCommentId) {
      onReply();
    } else onReply(id, author); // გამოიძახეთ onReply ფუნქცია
  };

  return (
    <Box ml={4}>
      {comments.map((comment) => (
        <Box key={comment.id} mt={3}>
          <Box display='flex'>
            <Avatar
              src={comment.author_avatar}
              sx={{ width: 38, height: 38, mr: 2, mt: 0.5 }}
            />
            <Box>
              <Typography
                variant='subtitle1'
                fontWeight={500}
                fontSize={18}
                fontFamily='"FiraGO", sans-serif'
              >
                {comment.author_nickname}
              </Typography>
              <Typography mr={5} color='text.secondary' fontWeight={350}>
                {comment.text}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() =>
              handleReplyClick(comment.id, comment.author_nickname)
            }
            sx={{
              ml: 7,
              my: 0.5,
              color: 'var(--primary)',
              fontFamily: '"Fredoka One", cursive',
            }}
          >
            <img
              style={{
                paddingRight: '6px',
                transform:
                  selectedCommentId === comment.id
                    ? 'rotate(270deg) scaleX(-1)' // როტაცია 90 გრადუსით + სარკისებური არეკვლა
                    : 'none',
                transition: 'transform 0.2s ease', // გლუვი ეფექტი
              }}
              src='/images/icons/answer.svg'
              width={16}
              height={16}
              alt='answer'
            />{' '}
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
                <Typography color='text.secondary'>
                  {subComment.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;
