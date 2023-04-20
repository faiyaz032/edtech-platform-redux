import React, { useState } from 'react';
import AdminVideoList from '../../components/Admin/AdminVideo/AdminVideoList';
import AddVideoForm from '../../components/Admin/Forms/AddVideoForm';
import Modal from '../../components/UI/Modal/Modal';

export default function AdminVideo() {
  const [openModal, setOpenModal] = useState(false);

  const handleOnClick = () => setOpenModal(true);

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={handleOnClick} className="btn ml-auto">
                Add Video
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <AdminVideoList />
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} title={'Add New Video'}>
          <AddVideoForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
}
