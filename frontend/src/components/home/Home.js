import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./home.css"
import Carts from '../cart/Carts';
import Loading from '../loading/Loading';

const API_URL = process.env.REACT_APP_BASE_URL; // Update with your backend server URL

const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("")


    const fetchImages = () => {
        axios.get(`${API_URL}/search?text=${encodeURIComponent(searchText)}&category=${category}`)
            .then(response => {
                const newImages = response.data.hits;
                setImages(newImages);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setImages([]);
        fetchImages()
    };

    const hendlerCategory = (e) => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        setImages([]);
        fetchImages();
    }, [category]);

    return (
        <>
            <header id='header'>
                <form onSubmit={handleSearch} className='form'>
                    <select name="category" id="category" onChange={hendlerCategory}>
                        <option value="">Select category</option>
                        {categories.map((category, index) => {
                            return <option value={category} key={index}>{category}</option>
                        })}
                    </select>
                    <input
                        type="text"
                        value={searchText}
                        placeholder='Search...'
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </form>
            </header>
            <div id='carts'>
                {images.length === 0 && <Loading />}
                {images.map((image, index) => (
                    <Carts key={index} image={image} />
                ))}

            </div>
        </>
    );
}

export default Home;
