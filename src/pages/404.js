import { useEffect } from 'react';

function NoPage() {

  useEffect(() => { document.title = "404" }, []);

  return (
    <main className="container">
    <br /><br /><br />
    <h1 class='centered'>Maaf, laman yang anda minta tidak wujud</h1>
    </main>
  );
}
  
  export default NoPage;