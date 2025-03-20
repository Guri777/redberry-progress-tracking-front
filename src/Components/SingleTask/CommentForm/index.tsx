import React from 'react';
import { TextField, Stack, Typography } from '@mui/material';
import CustomNavButton from '@/Components/Layout/CustomNavButton';

interface CommentFormProps {
  comment: string;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
  replyingTo?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  comment,
  onCommentChange,
  onSubmit,
  replyingTo,
}) => (
  <Stack>
    {replyingTo && (
      <Typography pb={1} fontWeight={600}>
        შენ პასუხობ {replyingTo} -ს!
      </Typography>
    )}
    <TextField
      fullWidth
      placeholder='დაამატე კომენტარი'
      value={comment}
      multiline
      rows={4}
      onChange={(e) => onCommentChange(e.target.value)}
      sx={{ mb: 2 }}
    />
    <CustomNavButton
      text='დააკომენტარე'
      variant='filled'
      sx={{
        fontFamily: '"Fredoka One", cursive',

        color: 'white',
        ml: 'auto',
        borderRadius: 10,
        transform: 'translate(-20px,-70px)',
      }}
      onClick={onSubmit}
    />
  </Stack>
);

export default CommentForm;
