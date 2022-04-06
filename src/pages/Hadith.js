import { useState, useEffect } from 'react';
import { getTheKeetab, giveTheKeetab } from './getTimes';

function Hadith() {
  
  const [intro, setIntro] = useState(true);
  const [hadith, setHadith] = useState([]);
  const [search, setSearch] = useState("");
  const [keetab, setKeetab] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => { document.title = "Hadith" }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await giveTheKeetab(search).then(data => {
      setDisplay(true);
      setIntro(false);
      setHadith(data);
    });
  }

  async function handleClick(event) {
    if (keetab.length > 5) {
      setSearch(event.target.value);
      return;
    } else if (keetab.length === 0) {
      await getTheKeetab().then(data => {
        setKeetab(data);
      setSearch(event.target.value);
      });
    }
  }

  function HadithPage() {
    if (display) {
      return (
        <>
          {hadith.map((hadis, index) => (
            <div className='quranAyats' key={index}>
              <h3 className='hadis'>{hadis.arab}</h3>
              <p>{hadis.id}</p>
              <br />
            </div>
          ))}
        </>
      );
    }
  }

  return (
    <main className="container">
    <div className="grid">
        <div>
          <form onSubmit={handleSubmit}>
            <select onClick={handleClick} id="keetab" required="" name="keetab">
              <option value="">Sila pilih kitab...</option>
              {keetab.map((solkeetab) => (
                <option key={solkeetab.id} value={solkeetab.id}>{solkeetab.name}</option>
              ))}
            </select>
            <button type="submit" value="Submit">Pilih</button> 
          </form>
        </div>
        <div />
        <div />
        <div>
          <h1>Hadith</h1>
        </div>
      </div>
      {HadithPage(keetab)}
      {TheIntro()}
    </main>
  );
}
  
  export default Hadith;