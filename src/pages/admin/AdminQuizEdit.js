import AdminQuizUpdateForm from '../../components/Admin/Forms/AdminQuizUpdateForm';

export default function AdminQuizEdit() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Update Quiz</h2>
        </div>
        {/* <StudentRegisterForm /> */}
        <AdminQuizUpdateForm />
      </div>
    </section>
  );
}
