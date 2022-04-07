import { useState, useEffect } from 'react';
import { getTheQuran, giveTheQuran } from './js/Helper';

function Quran() {

  const [intro, setIntro] = useState(true);
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [quran, setQuran] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function Awwalun() {
      setSurah(await getTheQuran());
    }    
    Awwalun();
    document.title = "Al-Quran"
  }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
      setQuran([]);
      event.preventDefault();
      await giveTheQuran(search).then(data => {
        setQuran(data);
        setIntro(false);
        setDisplay(true);
      });
    }
  
  async function handleClick(event) {
    setSearch(event.target.value);
  }  

  function QuranData(props) {
      const { text, audio, translation, number } = props.data;
      return (
          <div className="quranAyats">
              <h3 className="quranic">{text.arab} ({number.inSurah})</h3>
              <p>{translation.id}</p>
              <audio controls>
              <source src={audio.primary} />
              Your browser does not support the audio element.
              </audio>
          </div>
      );
  }

  function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
      const [pages] = useState(Math.round(data.length / dataLimit));
      const [currentPage, setCurrentPage] = useState(1);

      useEffect(() => {
          window.scrollTo({ behavior: 'smooth', top: '0px' });
        }, [currentPage]);
    
      function goToNextPage() {
          setCurrentPage((page) => page + 1);
      }
    
      function goToPreviousPage() {
          setCurrentPage((page) => page - 1);
      }
    
      function changePage(event) {
          const pageNumber = Number(event.target.textContent);
          setCurrentPage(pageNumber);
      }
    
      const getPaginatedData = () => {
          const startIndex = currentPage * dataLimit - dataLimit;
          const endIndex = startIndex + dataLimit;
          return data.slice(startIndex, endIndex);
      };
    
      const getPaginationGroup = () => {
          let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
          return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
      };

      function showPaginateNav() {
        if (pages <= 1)
          return null;
        else if (pages > 1)
          return (
        <div className="grid">
            <div />
            <div className="pagination">
            {/* previous button */}
            <button 
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                Sebelumnya
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
                <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                <span>{item}</span>
                </button>
            ))}

            {/* next button */}
            <button
                onClick={goToNextPage}
                className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
                Seterusnya
            </button>
            </div>
            <div />
            </div>
          );
      }
    
      return (
          <div>
          {/* show the ayats, 10 posts at a time */}
          <div className="dataContainer">
          {getPaginatedData().map((d, idx) => (
              <RenderComponent key={idx} data={d} />
          ))}
          </div>
          <br /><br />
          {showPaginateNav()}
      </div>
      );
    }

  function PaginateQuran() {
    if (display)
      return (
          <Pagination
          data={quran}
          RenderComponent={QuranData}
          pageLimit={5}
          dataLimit={10}
          />
      );
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
      <div>{PaginateQuran()}</div>
      {TheIntro()}
      <br /><br />
    </main>
  );
}
  
  export default Quran;