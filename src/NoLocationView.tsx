import './css/NoLocationView.css'
import searchIcon from './assets/searchIcon.svg'
import noLoactionIcon from './assets/noLoactionIcon.svg'

function NoLocationView() {
    return (
        <div className='no-location-view'>
            <div className="search-container">
                <input type="text" placeholder="Search Location" className="search-input" />
                <button type="submit" className="search-button">
                    <img src={searchIcon} alt="Search Icon" />
                </button>
            </div>
            <div className='no-location-title'>
                <img src={noLoactionIcon} alt="noLoactionIcon" />
                <div>No locations added to watchlist</div>
            </div>
        </div>
    );
};

export default NoLocationView;