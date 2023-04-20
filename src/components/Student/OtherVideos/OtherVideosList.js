import React from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from '../../UI/Error/Error';
import OtherVideosItem from './OtherVideosItem';

export default function OtherVideosList() {
  const { data: videos, isError, isLoading, error } = useGetVideosQuery();
  //decide what to render
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <Error message={error.data} />;
  if (!isLoading && !isError && videos?.length === 0) {
    content = <h3>No Videos Found</h3>;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map(video => {
      return <OtherVideosItem key={video.id} video={video} />;
    });
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}
