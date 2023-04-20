import { useState } from 'react';
import AssignmentList from '../../components/Admin/Assignments/AssignmentList';
import AddAssignmentForm from '../../components/Admin/Forms/AddAssignmentForm';
import Modal from '../../components/UI/Modal/Modal';

export default function AdminAssignment() {
  const [openModal, setOpenModal] = useState(false);

  const handleOnClick = () => setOpenModal(true);
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={handleOnClick} className="btn ml-auto">
                Add Assignment
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <AssignmentList />
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} title={'Add New Assignment'}>
          <AddAssignmentForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
}
