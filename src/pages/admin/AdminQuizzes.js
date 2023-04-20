import { useState } from 'react';
import QuizzesList from '../../components/Admin/AdminQuizzes/QuizzesList';
import AddQuizForm from '../../components/Admin/Forms/AddQuizForm';
import Modal from '../../components/UI/Modal/Modal';

export default function AdminQuizzes() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div onClick={e => setOpenModal(true)} className="w-full flex">
            <button className="btn ml-auto">Add Quiz</button>
          </div>
          {openModal && (
            <Modal setOpenModal={setOpenModal} title={'Add New Quiz'}>
              <AddQuizForm setOpenModal={setOpenModal}></AddQuizForm>
            </Modal>
          )}
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Question</th>
                  <th className="table-th">Video</th>
                  <th className="table-th justify-center">Action</th>
                </tr>
              </thead>

              <QuizzesList />
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
