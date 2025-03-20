import React, { Suspense, useEffect, useRef, useState } from 'react';

import CustomWrapper from '@/Components/Layout/CustomWrapper';
import { Typography } from '@mui/material';
import CreateTaskSection from '@/Components/CreateTaskSection';

interface CreateTaskProps {
  openUserModal: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ openUserModal }) => {
  return (
    <CustomWrapper>
      <Typography
        mt={15.25}
        fontSize={34}
        fontWeight={600}
        fontFamily='"FiraGO", sans-serif'
      >
        შექმენით ახალი დავალება
      </Typography>
      <CreateTaskSection openUserModal={openUserModal} />
    </CustomWrapper>
  );
};

export default CreateTask;
