import DeleteIcon from '@mui/icons-material/Delete';
import React, { useRef, useState } from 'react';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FieldError } from 'react-hook-form';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  errors?: FieldError;
}

const MAX_FILE_SIZE = 600 * 1024; // 600KB

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  errors,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError('ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setError(null); // Clear error on successful upload
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
      <Box
        mt={2}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        width='100%'
        height={150}
        border='2px dashed #9e9e9e'
        borderRadius={2}
        position='relative'
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {value ? (
          <>
            <Avatar src={value} sx={{ width: 80, height: 80 }} />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              sx={{
                color: 'gray',
                position: 'absolute',
                top: 'calc(50% + 15px)',
                left: 'calc(50% + 15px)',
                width: '25px',
                height: '25px',
                bgcolor: 'white',
                ':hover': { bgcolor: 'white' },
              }}
            >
              <DeleteIcon sx={{ color: 'gray', width: '15px' }} />
            </IconButton>
          </>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 40, color: '#757575' }} />
            <Typography variant='body2' color='textSecondary'>
              დააჭირე სურათის ასატვირთად{' '}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              (JPG, PNG, ან GIF, მაქს 600KB)
            </Typography>
          </>
        )}
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>

      {error ||
        (errors?.message && (
          <Typography color='error' variant='caption' mt={1}>
            ❌ {error ?? errors.message}
          </Typography>
        ))}
    </Box>
  );
};

export default ImageUpload;
