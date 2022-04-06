import { useEffect } from 'react';

function Contact() {

  useEffect(() => { document.title = "Contact Us" }, []);

  return (
    <main className="container">
      <div className='centered'>
      <h1>Contact</h1>
      <br />
      <p>Reach us:</p><a href='https://github.com/c4lyp5o'>@c4lyp5o</a>
      </div>
    </main>
  );
}
  
  export default Contact;