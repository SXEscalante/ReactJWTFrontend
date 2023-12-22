import './Dropdown.css'

const Dropdown = ({ logoutUser, }) => {
    return ( 
        <div className='dropdown'>
            <button>Username</button>
            <div className="content">
                <a href="/favorites">Favorite</a>
                <a href="">Logout</a>
            </div>
        </div>
    );
}
 
export default Dropdown;