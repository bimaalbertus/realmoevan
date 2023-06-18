import './style.css';
import background from '../../assets/images/misc/footer-bg.jpg';

// ----------------------------------------------------------------------

export default function Preloader() {
  return (
    <div
      className="preloader-layout fixed inset-0 z-50 bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
