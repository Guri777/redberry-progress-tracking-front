import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import CustomWrapper from '@/Components/Layout/CustomWrapper';
import { useFetchQuery } from '@/hooks/API/useQuery';
import { usePostMutation } from '@/hooks/API/usePostMutation';

import { Task, Comment, Status } from '@/types';
import TaskDetails from '@/Components/SingleTask/TaskDetails';
import CommentSection from '@/Components/SingleTask/CommentsSection';
import CommentForm from '@/Components/SingleTask/CommentForm';

const TaskSingle: React.FC = () => {
  const queryClient = useQueryClient();
  const { taskId } = useParams<{ taskId: string }>();
  const [answeringId, setAnsweringId] = useState<{
    id: string;
    author: string;
  } | null>(null);
  const [comment, setComment] = useState('');

  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );

  const {
    data: task,
    error: taskError,
    isLoading: taskIsLoading,
  } = useFetchQuery<Task>(`tasks-${taskId}`, `/tasks/${taskId}`);

  const {
    data: statuses,
    error: statusError,
    isLoading: statusIsLoading,
  } = useFetchQuery<Status[]>('statuses', '/statuses');

  const {
    data: dbComments,
    error: dbCommentsError,
    isLoading: dbCommentsIsLoading,
  } = useFetchQuery<Comment[]>(
    `tasks-${taskId}-comments`,
    `/tasks/${taskId}/comments`,
  );

  const { mutate: addComment, isPending: isAddingComment } = usePostMutation<
    any,
    FormData
  >(`/tasks/${taskId}/comments`);

  const handleAddComment = () => {
    const formData = new FormData();
    formData.set('text', comment);
    if (answeringId?.id) {
      formData.set('parent_id', answeringId.id);
    }
    addComment(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`tasks-${taskId}-comments`],
        });
        setComment('');
        setAnsweringId(null);
        setSelectedCommentId(null);
      },
      onError: (error) => {
        console.error('Error submitting form:', error.message);
      },
    });
  };

  const calculateTotalComments = (comments?: Comment[]): number => {
    if (!comments) return 0;
    return comments.reduce((total, comment) => {
      return (
        total + 1 + (comment.sub_comments ? comment.sub_comments.length : 0)
      );
    }, 0);
  };
  if (taskIsLoading || dbCommentsIsLoading || statusIsLoading)
    return <CircularProgress />;
  if (taskError || !task)
    return <Typography color='error'>Error loading task</Typography>;

  useEffect(() => {
    document.title = task.name ?? 'Task';
  }, []);
  return (
    <CustomWrapper sx={{ mt: 15 }}>
      <Grid container>
        <TaskDetails task={task} statuses={statuses || []} taskId={taskId} />
        <Grid item xs={12} sm={5.3} ml='auto'>
          <Box
            mt={5}
            p={3}
            border='1px solid var(--comments-section-border)'
            bgcolor='var(--comments-section-bg)'
            borderRadius='10px'
          >
            <CommentForm
              comment={comment}
              onCommentChange={setComment}
              onSubmit={handleAddComment}
              replyingTo={answeringId?.author}
            />
            <Typography
              variant='h6'
              fontWeight='bold'
              fontFamily='"FiraGO", sans-serif'
              mb={2}
              ml={4}
              gap={1}
              display='flex'
              justifyContent='start'
              alignItems='center'
            >
              კომენტარები{' '}
              <Box
                component='span'
                bgcolor='var(--primary)'
                display='flex'
                alignItems='center'
                justifyContent='center'
                color='white'
                minWidth={20}
                borderRadius='50%'
                p={0.5}
                fontSize={14}
              >
                {calculateTotalComments(dbComments)}
              </Box>
            </Typography>
            <CommentSection
              comments={dbComments || []}
              onReply={(id, author) =>
                setAnsweringId({ id: id || '', author: author || '' })
              }
              selectedCommentId={selectedCommentId}
              setSelectedCommentId={setSelectedCommentId}
            />
          </Box>
        </Grid>
      </Grid>
    </CustomWrapper>
  );
};

export default TaskSingle;
