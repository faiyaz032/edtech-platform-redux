import React from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from '../../UI/Error/Error';
import AdminVideoItem from './AdminVideoItem';

export default function AdminVideoList() {
  const { data: videos, isError, error, isLoading } = useGetVideosQuery();

  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && videos?.length === 0) {
    content = <h3>No Videos Found</h3>;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map(video => {
      return <AdminVideoItem key={video.id} video={video} />;
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
