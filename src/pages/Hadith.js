import { useState, useEffect } from 'react';
import { getTheKeetab, giveTheKeetab } from './js/Helper';

function Hadith() {
  
  const [intro, setIntro] = useState(true);
  const [hadith, setHadith] = useState([]);
  const [search, setSearch] = useState("");
  const [keetab, setKeetab] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function Awwalun() {
      setKeetab(await getTheKeetab());
    }    
    Awwalun();
    document.title = "Hadith";
  }, []);

  function TheIntro() {
    if (intro === true) {
      return (
        <p>Assalamualaikum</p>
      );
    }
  }

  async function handleSubmit(event) {
    setHadith([]);
    event.preventDefault();
    await giveTheKeetab(search).then(data => {
        // console.log(data);
        setHadith(data);
        setIntro(false);
        setDisplay(true);
    });
  }

  async function handleClick(event) {
    setSearch(event.target.value);
  }

  function HadithData(props) {
    const { arab, id } = props.data;
    return (
        <div className="quranAyats">
            <h3 className="hadis">{arab}</h3>
            <p>{id}</p>
        </div>
    );
}

function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
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

function PaginateHadith() {
  if (display)
    return (
        <Pagination
        data={hadith}
        RenderComponent={HadithData}
        pageLimit={5}
        dataLimit={1}
        />
    );
}

//   function HadithPage() {
//     if (display) {
//       return (
//         <>
//           {hadith.map((hadis, index) => (
//             <div className='quranAyats' key={index}>
//               <h3 className='hadis'>{hadis.arab}</h3>
//               <p>{hadis.id}</p>
//               <br />
//             </div>
//           ))}
//         </>
//       );
//     }
//   }

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
      <div>{PaginateHadith()}</div>
      {TheIntro()}
    </main>
  );
}
  
  export default Hadith;