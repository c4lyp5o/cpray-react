import React, { useState, useEffect } from 'react';

const url = 'https://api.quran.sutanlab.id/surah/2';

function Tests() {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data.data.verses))
            .catch(error => setError(error));
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
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
      
        return (
            <div>
            <h1>{title}</h1>

            {/* show the posts, 10 posts at a time */}
            <div className="dataContainer">
            {getPaginatedData().map((d, idx) => (
                <RenderComponent key={idx} data={d} />
            ))}
            </div>
            <br /><br />
            {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time
            */}
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
        </div>
        );
      }
    
    if (error) return <h1>{error}</h1>;

    return (
        <main className="container">
            <div>
            {data.length > 0 ? (
                <>
                <Pagination
                    data={data}
                    RenderComponent={QuranData}
                    title="Posts"
                    pageLimit={5}
                    dataLimit={10}
                />
                </>
            ) : (
            <h1>No Posts to display</h1>
            )}
            </div>
        </main>
      );
    }

export default Tests;


