import { useState, useEffect } from 'react';
import { getTheQuran, giveTheQuran, giveQuranAudio } from './getTimes';

function Quran() {

  useEffect(() => {
    async function Awwalun() {
      setSurah(await getTheQuran());
    }    
    Awwalun();
  }, []);

  const [intro, setIntro] = useState(true);
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [quran, setQuran] = useState([]);
  const [display, setDisplay] = useState(false);
  const [audio, setAudio] = useState([]);
  const [clicked, setClicked] = useState(0);

  useEffect(() => { document.title = "Al-Quran" }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await giveQuranAudio(search).then(data => { setAudio(data); console.log(data); });
    await giveTheQuran(search).then(data => {
      setDisplay(true);
      setIntro(false);
      setQuran(data);
      console.log(audio);
    });
  }

  async function handleClick(event) {
    setClicked(clicked + 1);
    if (clicked === 0) {
      return;
    } else if (clicked === 2) {
      window.location.reload();
    }
    setSearch(event.target.value);
  }

  function Surah() {
    if (display) {
      return (
        <>
          {quran.map((ayats, index) => (
            <div className='quranAyats' key={index}>
              <h3 className='quranic'>{ayats.text} ({index + 1})</h3>
              <p>{ayats.translation}</p>
              <audio key={index} controls><source src={audio[index].audio.primary} /></audio>
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
            <select onClick={handleClick} id="surah" required="" name="surah">
              <option value="">Sila pilih surah...</option>
              {surah.map((thesurah, index) => (
                <option key={index} value={index}>{thesurah.transliteration}</option>
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
      <div>{Surah(quran)}</div>
      {TheIntro()}
    </main>
  );
}
  
  export default Quran;