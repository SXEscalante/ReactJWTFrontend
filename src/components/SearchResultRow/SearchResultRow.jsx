const SearchResultRow = ({item}) => {
    return ( 
        <div>
            <img src={item.volumeInfo.imageLinks.thumbnail} alt={`The cover art for ${item.volumeInfo.title}`} />
            <h5>{item.volumeInfo.title}</h5>
        </div>
    );
}
 
export default SearchResultRow;