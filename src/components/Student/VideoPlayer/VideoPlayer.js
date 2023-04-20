import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import assignmentMarkApi from '../../../features/assignmentMark/assignmentMarkApi';
import { useGetAssignmentByVideoIdQuery } from '../../../features/assignments/assignmentsApi';
import { quizMarkApi } from '../../../features/quizMark/quizMarkApi';
import { useGetVideoQuery } from '../../../features/videos/videosApi';
import { selectVideoId } from '../../../features/videos/videosSlice';
import formatDate from '../../../utils/formatDate';
import Modal from '../../UI/Modal/Modal';
import SubmitAssignmentForm from '../Forms/SubmitAssignmentForm';

export default function VideoPlayer() {
  const [request, setRequest] = useState(false);
  const [quizExists, setQuizExists] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [assignmentExists, setAssignmentExists] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { selectedVideoId } = useSelector(state => state.videos);

  const { data: requestedVideo } = useGetVideoQuery(selectedVideoId, {
    skip: !request,
  });
  const { data: assignment } = useGetAssignmentByVideoIdQuery(selectedVideoId);

  const { url, title, description, createdAt } = requestedVideo || {};

  const location = useLocation();

  //update the selectedVideoId when the locationChanges
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlVideoId = searchParams.get('video_id');
    dispatch(selectVideoId(urlVideoId));
  }, [location, dispatch]);

  useEffect(() => {
    async function asyncInvoke() {
      setRequest(true);
      const res = await dispatch(
        quizMarkApi.endpoints.quizMarkExists.initiate({
          studentId: user.id,
          videoId: selectedVideoId,
        })
      );

      if (res.data.length) setQuizExists(true);
      else setQuizExists(false);
    }
    asyncInvoke();
  }, [selectedVideoId, dispatch, user]);

  useEffect(() => {
    setAssignmentSubmitted(false);
    async function asyncInvoke() {
      const res = await dispatch(
        assignmentMarkApi.endpoints.assignmentMarkExists.initiate({
          assignmentId: assignment[0]?.id,
          studentId: user.id,
        })
      );
      if (res.data.length) setAssignmentExists(true);
      else setAssignmentExists(false);
    }
    asyncInvoke();
  }, [selectedVideoId, dispatch, user, assignment]);

  const formattedDate = formatDate(createdAt);

  const handleAssignmentClick = () => setOpenModal(true);

  return (
    <>
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <div className="relative">
          <iframe
            width="100%"
            src={url ? url : ''}
            className="aspect-video"
            title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          {/* Hiding the Icon using Z-Index Trick */}
          <i className="fa-solid fa-play"></i>
        </div>

        {!selectedVideoId ? (
          <h1 className="text-xl text-center font-semibold tracking-tight text-slate-100">
            Please Select A Video To Play
          </h1>
        ) : (
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on {formattedDate}
            </h2>

            <div className="flex gap-4">
              {assignmentExists || assignmentSubmitted ? (
                <button
                  disabled
                  onClick={handleAssignmentClick}
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  আপনি এসাইনমেন্ট জমা দিয়েছেন
                </button>
              ) : (
                <button
                  onClick={handleAssignmentClick}
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  এসাইনমেন্ট
                </button>
              )}

              {quizExists ? (
                <button
                  disabled
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  আপনি কুইজে অংশগ্রহণ করেছেন
                </button>
              ) : (
                <Link
                  to={`/quiz/${selectedVideoId}`}
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  কুইজে অংশগ্রহণ করুন
                </Link>
              )}
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
          </div>
        )}
      </div>
      {/* Assignment Submit Modal */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} title={'Submit Assignment'}>
          <SubmitAssignmentForm
            setOpenModal={setOpenModal}
            setAssignmentSubmitted={setAssignmentSubmitted}
            extraInfos={{
              student_id: user.id,
              student_name: user.name,
              assignment_id: assignment[0].id,
              title: assignment[0].title,
            }}
          />
        </Modal>
      )}
    </>
  );
}
