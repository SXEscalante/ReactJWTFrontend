import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SearchResultRow from "../../components/SearchResultRow/SearchResultRow";

const SearchResultsPage = ({}) => {
    const [searchResults, setSearchResults] = useState([]);
    const { searchParam } = useParams();
    console.log(searchParam);



    const handleSearch = async () => {
        try {
          console.log(searchParam)
          const responce = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}`)
          if (responce.status === 200){
            setSearchResults(responce.data.items.map((item, i) => <SearchResultRow key={i} item={item}/>));
          }
        } catch (error) {
          console.log("Error searching for search term:", searchParam)
        }
    }

    useEffect(() => {
      handleSearch();
    }, [searchParam])

    return ( 
        <div>
            {searchResults}
        </div>
    );
}
 
export default SearchResultsPage;