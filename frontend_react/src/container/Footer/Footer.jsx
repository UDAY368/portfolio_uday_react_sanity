import React, {useState} from 'react';

import {images} from '../../constants';
import {AppWrap, MotionWrap} from '../../wrapper';
import {client} from '../../client';

import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({name:'', email:'', message:''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name, email, message} = formData;

  const handleChangeInput = (e) => {
    const {name,value} = e.target;

    setFormData({...formData, [name]:value});
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type:  'contact',
      name : name,
      email : email,
      message : message
    }

    client.create(contact)
      .then(() =>{
        setLoading(false);
        setIsFormSubmitted(true);
      })
  }

  return (
    <>
      <h3 className='head-text'>Take a coffee & chat with me</h3>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:udayabdm368@gmail.com" className='p-text'>udayabdm368@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+91 9705914525" className='p-text'>+91 9705914525</a>
        </div>
      </div>

    {!isFormSubmitted ?   

      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input type="text" value={name} className='p-tex' name='name'
          placeholder='Your Name' onChange={handleChangeInput} />
        </div>
        <div className='app__flex'>
          <input type="email" value={email} className='p-tex' name='email'
          placeholder='Your Email' onChange={handleChangeInput} />
        </div>

        <div>
          <textarea name="message" value={message} className='p-text'
          placeholder='Your Message' onChange={handleChangeInput}/>
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
      </div>
        : <div className='app__footer-submit'>
          <h5 className='head-text'>Thank you for getting in touch 🤝</h5>
        </div>}
    </>
  );
}


export default AppWrap(
  MotionWrap(Footer, 'app__footer'), 
  'contact',
  'app__whiteBg');
