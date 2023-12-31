import './Dropdown.css'

const Dropdown = ({ logoutUser, username }) => {
    console.log(username)
    return ( 
        <div className='dropdown'>
            <button>{`Welcome ${username.userName}`}</button>
            <div className="content">
                <a href="/favorites">Favorite</a>
                <a href="">Logout</a>
            </div>
        </div>
    );
}
 
export default Dropdown;