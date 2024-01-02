import './Dropdown.css'

const Dropdown = ({ logoutUser, username }) => {
    console.log(username)
    return ( 
        <div className='dropdown'>
            <button>{`Welcome ${username.userName}`}</button>
            <div className="content">
                <a className='menu-option favorites' href="/favorites">Favorite</a>
                <p className='menu-option logout' onClick={logoutUser}>Logout</p>
            </div>
        </div>
    );
}
 
export default Dropdown;