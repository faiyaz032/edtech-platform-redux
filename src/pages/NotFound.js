import logo from '../assets/image/learningportal.svg';
export default function NotFound() {
  return (
    <div className="not-found-page">
      <img src={logo} alt="Logo" className="not-found-page__logo" />
      <h1 className="not-found-page__heading">404 Not Found</h1>
      <p className="not-found-page__subheading">The page you're looking for could not be found.</p>
    </div>
  );
}
