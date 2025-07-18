// // src/components/News.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const News = () => {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:1337/api/news-contents?populate=*')
//       .then((res) => {
//         console.log("📦 News API Response:", res.data);
//         setNews(res.data.data || []);
//       })
//       .catch((err) => console.error('API Error:', err));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">📰 Latest News</h2>
//       <div className="row">
//         {news.map((item) => {
//           const {
//             id,
//             title,
//             content,
//             publishedDate,
//             media,
//           } = item;

//           const imageUrl = media?.url
//             ? `http://localhost:1337${media.url}`
//             : null;

//           return (
//             <div key={id} className="col-md-6 mb-4">
//               <div className="card h-100 shadow">
//                 {imageUrl && (
//                   <img
//                     src={imageUrl}
//                     className="card-img-top"
//                     alt={title}
//                     style={{ maxHeight: '300px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{title}</h5>
//                   <div
//                     className="card-text"
//                     dangerouslySetInnerHTML={{ __html: content }}
//                   />
//                   {publishedDate && (
//                     <small className="text-muted d-block mt-2">
//                       📅 {new Date(publishedDate).toLocaleDateString()}
//                     </small>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default News;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_KEY = 'YOUR_NEWSAPI_ORG_KEY';

// const News = () => {
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get('https://newsapi.org/v2/top-headlines', {
//         params: {
//           country: 'us',        // change to desired country
//           category: 'health',   // or your category
//           apiKey: API_KEY,
//           pageSize: 10          // limit articles
//         }
//       })
//       .then(res => setArticles(res.data.articles || []))
//       .catch(err => {
//         console.error(err);
//         setError('Failed to load news.');
//       });
//   }, []);

//   if (error) return <div className="container mt-4 text-danger">{error}</div>;

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">📰 News & Updates</h2>
//       <div className="row">
//         {articles.map((item, idx) => (
//           <div key={idx} className="col-md-6 mb-4">
//             <div className="card h-100 shadow-sm">
//               {item.urlToImage && (
//                 <img
//                   src={item.urlToImage}
//                   className="card-img-top"
//                   alt={item.title}
//                   style={{ maxHeight: '250px', objectFit: 'cover' }}
//                 />
//               )}
//               <div className="card-body">
//                 <h5 className="card-title">{item.title}</h5>
//                 <p className="card-text">{item.description}</p>
//               </div>
//               <div className="card-footer text-muted">
//                 {new Date(item.publishedAt).toLocaleDateString()}
//                 {item.source?.name && ` • ${item.source.name}`}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default News;


import React, { useState, useEffect } from 'react';
import newsData from '../data/newsData.json';
import '../App.css'

const News = () => {
    const [language, setLanguage] = useState('en'); // 'en' or 'np'
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [modalNews, setModalNews] = useState(null);
    const [filteredNews, setFilteredNews] = useState([]);

    useEffect(() => {
        filterNews();
    }, [language, selectedCategory]);

    const filterNews = () => {
        const filtered = newsData.filter(
            (item) => selectedCategory === 'All' || item.category === selectedCategory
        );
        setFilteredNews(filtered);
    };

    const handleReadMore = (newsItem) => {
        setModalNews(newsItem);
    };

    const handleCloseModal = () => {
        setModalNews(null);
    };

    const categories = ['All', 'Event', 'Urgent', 'Thank You'];

    return (
        <div className="container my-5">
            {/* Language Toggle */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>{language === 'en' ? 'Latest News' : 'हालका समाचार'}</h2>
                {/* Scrolling News Banner */}
                
                <div>
                    <button
                        className={`btn btn-sm me-2 ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setLanguage('en')}
                    >
                        English
                    </button>
                    <button
                        className={`btn btn-sm ${language === 'np' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setLanguage('np')}
                    >
                        नेपाली
                    </button>
                </div>
            </div>
<div className="bg-danger text-white py-2 px-3 rounded mb-3 overflow-hidden position-relative">
                    <div className="marquee">
                        {language === 'en'
                            ? '📢 News is updating live... Stay tuned for the latest updates!'
                            : '📢 समाचार अद्यावधिक हुँदैछ... पछिल्लो समाचारको लागि तयार रहनुहोस्!'}
                    </div>
                </div>
            {/* Filter by Category */}
            <div className="mb-4">
                <select
                    className="form-select w-auto"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                >
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* News Cards */}
            <div className="row">
                {filteredNews.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={item.image}
                                alt={item.title[language]}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title[language]}</h5>
                                <p className="card-text text-muted small">{item.date}</p>
                                <p className="card-text flex-grow-1">
                                    {item.description[language].slice(0, 100)}...
                                </p>
                                <button
                                    className="btn btn-outline-primary btn-sm mt-auto"
                                    onClick={() => handleReadMore(item)}
                                >
                                    {language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Read More Modal */}
            {modalNews && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalNews.title[language]}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={modalNews.image}
                                    alt={modalNews.title[language]}
                                    className="img-fluid mb-3"
                                    style={{ objectFit: 'cover', width: '100%', maxHeight: '300px' }}
                                />
                                <p className="text-muted small">{modalNews.date}</p>
                                <p>{modalNews.description[language]}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    {language === 'en' ? 'Close' : 'बन्द गर्नुहोस्'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;


