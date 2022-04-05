import { useState } from 'react';
import { getTheQuran, giveTheQuran } from './getTimes';

function Quran() {
  
  const [intro, setIntro] = useState(true);
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [quran, setQuran] = useState([]);
  const [display, setDisplay] = useState(false);

  const TheIntro = () => {
    if (intro === true) {
      return (
      <p1>Assalamualaikum</p1>
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await giveTheQuran(search).then(data => {
      setDisplay(true);
      setIntro(false);
      setQuran(data);
    });
  }

  async function handleClick(event) {
    if (surah.length > 113) {
      setSearch(event.target.value);
      return;
    } else if (surah.length === 0) {
      setSearch(event.target.value);
      await getTheQuran().then(data => {
        setSurah(data);
      });
    }
  }

  function Surah() {
    if (display) {
      return (
        <>
          {quran.map((ayats, index) => (
            <div class='quranAyats' key={index}>
              <h3 class='arabic'>{ayats.text}</h3>
              <p>{ayats.translation}</p>
              <br />
            </div>
          ))}
        </>
      );
    }
  }

  return (
    <main className="container">
    <div class="grid">
        <div>
          <form onSubmit={handleSubmit}>
            <select onClick={handleClick} id="surah" required="" name="surah">
              <option value="">Sila pilih surah...</option>
              {surah.map((thesurah, index) => (
                <option key={index} value={index}>{thesurah}</option>
              ))}
            </select>
            <button type="submit" value="Submit">Pilih</button> 
          </form>
        </div>
        <div />
        <div />
        <div>
          <h1>Al Quran</h1>
        </div>
      </div>
      {Surah(quran)}
      {TheIntro()}
    </main>
  );
}
  
  export default Quran;