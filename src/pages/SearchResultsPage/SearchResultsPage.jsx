import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResultRow from "../../components/SearchResultRow/SearchResultRow";

const SearchResultsPage = ({}) => {
    const [searchResults, setSearchResults] = useState([]);
    const { searchParam } = useParams();

    const handleSearch = async () => {
        try {
          const responce = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}`)
          if (responce.status === 200){
            console.log("search", responce.data)
            setSearchResults(responce.data.items.map((item, i) => <SearchResultRow key={i} item={item}/>));
          }
        } catch (error) {
          console.log("Error searching for search term:", searchParam)
        }
    }

    useEffect(() => {
      handleSearch();
    }, [])

    return ( 
        <div>
            {searchResults}
        </div>
    );
}
 
export default SearchResultsPage;