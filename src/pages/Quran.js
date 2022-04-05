import { useState } from 'react';
import { getTheQuran, giveTheQuran } from './getTimes';
import { TheIntro } from './Home';

function Quran() {
  
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [quran, setQuran] = useState([]);
  const [display, setDisplay] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    await giveTheQuran(search).then(data => {
      setDisplay(true);
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
            <div key={index}>
              <h2>{ayats.text}</h2>
              <kbd>{ayats.translation}</kbd>
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
            <button type="submit" role="button" value="Submit">Pilih</button> 
          </form>
        </div>
        <div />
        <div />
        <div>
          <h1>Al Quran</h1>
        </div>
      {Surah(quran)}
      </div>
    </main>
  );
}
  
  export default Quran;