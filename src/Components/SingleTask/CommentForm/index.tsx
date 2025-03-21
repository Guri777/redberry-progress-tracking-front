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
  <Stack maxWidth='94%'>
    {replyingTo && (
      <Typography pb={1} fontWeight={600}>
        შენ პასუხობ {replyingTo} -ს!
      </Typography>
    )}
    <TextField
      fullWidth
      placeholder='დაწერე კომენტარი'
      value={comment}
      multiline
      rows={6}
      onChange={(e) => onCommentChange(e.target.value)}
      sx={{ m: '16px 21px 42px', bgcolor: 'white' }}
    />
    <CustomNavButton
      text='დააკომენტარე'
      variant='filled'
      sx={{
        fontFamily: '"Fredoka One", cursive',

        color: 'white',
        ml: 'auto',
        borderRadius: 10,
        transform: 'translate(0px,-100px)',
      }}
      onClick={onSubmit}
    />
  </Stack>
);

export default CommentForm;
