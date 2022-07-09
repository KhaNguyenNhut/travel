import { Avatar, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// material
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------
const path = 'http://localhost:3000/';
const path2 = 'http://localhost:3000/assets/images/';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const Video = styled('video')({
  height: 420,
  top: 0,
  width: '100%',
  objectFit: 'cover'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});
const CoverVideoStyle = styled('video')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function BlogPostCard({ post, index }) {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({});
  const [product, setProduct] = useState('');

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  function handleShowPost(post) {
    setOpen(true);
    setPostData(post);
    console.log(postData);
  }

  function onClickRemoveReport() {
    const path = 'http://localhost:3001/api/post/';
    axios.delete(path + post._id).then((response) => {
      setOpen(false);
      window.location.reload();
    });
  }

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }} onClick={() => handleShowPost(post)}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src={`http://localhost:3000${post.user[0].avatar}`}
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={post.user[0].name}
            src={`http://localhost:3000${post.user[0].avatar}`}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />
          {post.images[0].split('.')[1] === 'mp4' && (
            <CoverVideoStyle
              src={`http://localhost:3000/assets/images/${post.images[0]}`}
              controls
              autoPlay
              muted
            />
          )}
          {post.images[0].split('.')[1] !== 'mp4' && (
            <CoverImgStyle
              alt={post.Post_content}
              src={`http://localhost:3000//assets/images/${post.images[0]}`}
            />
          )}
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {post.Post_date}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {post.content}
          </TitleStyle>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {postData && (
            <div className="container-post">
              <div className="post-user">
                <div className="user-avatar">
                  <img src={path + post.user[0].avatar} alt="" />
                </div>
                <p className="user-name">
                  {post.user[0].name} <span>{post.user[0].createdAt}</span>
                </p>
              </div>
              <div className="post">
                {/* <p className="product">{product}</p> */}
                <p>{post.content}</p>
                {post.images[0]?.length > 0 && post?.images[0].split('.')[1] === 'mp4' && (
                  <Video src={path2 + +post.images[0]} controls autoPlay />
                )}
                {post.images[0]?.length > 0 && post?.images[0].split('.')[1] !== 'mp4' && (
                  <img src={path2 + post.images[0]} alt="" />
                )}
              </div>
              <div className="btn-hidden">
                <Button variant="contained" color="error" onClick={() => onClickRemoveReport()}>
                  Ẩn Bài Viết
                </Button>
                <Button
                  className="btn-report-btn"
                  variant="contained"
                  color="success"
                  onClick={() => setOpen(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </Grid>
  );
}
