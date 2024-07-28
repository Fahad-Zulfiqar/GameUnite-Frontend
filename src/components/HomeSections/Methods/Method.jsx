import './method.css';
import img10 from '../../../assets/10.jpeg';

const Method = () => {
  return (
    <div className="method-container">
      <h2>How it Works</h2>
      <div className="method-img-container">
        <img className='method-img' src={img10} alt="Method" />
      </div>
    </div>
  );
}

export default Method;
