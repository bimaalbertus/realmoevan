import {useState, useEffect} from 'react';
import {
    POPULAR_BASE_URL
} from '../../api/config';


const useHomeFetch = (searchTerm) =>{
    const [state, setState] = useState({movies:[]});
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);
    const fetchMovies = async endpoint =>{
        setError(false);
        setLoading(true);

        const isLoadMore = endpoint.search('page');
        //console.log('endpoint',endpoint.search('page'));

        try{ 
            const result = await (await fetch(endpoint)).json();
            //console.log('Movies',result);
            setState(prev => ({
                ...prev,
                movies: 
                isLoadMore !== -1 
                ? [...prev.movies, ...result.results] 
                : [...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage:result.page,
                totalPages:result.total_pages,
            }))
        } catch(error){
            setError(true);
            console.log(error);
 
        }
        setLoading(false);
    }
    //fetch popular movies
    /*useEffect(()=>{
        if(sessionStorage.home){
            console.log('Grabbing from session storage');
            setState(JSON.parse(sessionStorage.home));
            setLoading(false);
        }else{
            console.log('Grabbing from API');
            fetchMovies(`${POPULAR_BASE_URL}`);
        }
       
    }, []);*/
    /*useEffect(()=>{
       if(!searchTerm){
          console.log('Writing to sessionStorage'); 
          sessionStorage.setItem('home', JSON.stringify(state));
       }
        
    }, [searchTerm,state])*/
     useEffect(()=>{
        fetchMovies(`${POPULAR_BASE_URL}`);
    }, []);

    return [{state, loading, error}, fetchMovies];

}

export default useHomeFetch