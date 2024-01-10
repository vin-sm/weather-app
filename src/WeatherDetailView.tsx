import './css/weatherDetailView.css'
import arrowBackIcon from './assets/arrowBack.svg'
import rightArrowIcon from './assets/rightArrow.svg';
import { useNavigate, useParams} from 'react-router-dom';

function WeatherDetailView() {
    const navigate = useNavigate();
    // let { weatherData } = useParams();

    const goToHome = () => {
        navigate('/');
    };
    return (
        <div className='weather-detail-view'>
            <div className='header-view'>
                <button onClick={goToHome}>
                    <img src={arrowBackIcon} alt="arrowBackIcon" />
                    <div>Back</div>
                </button>
                <div className='actions'>
                    <div>
                        <button>Add To List</button>
                        <img src={rightArrowIcon} alt='rightArrowIcon' />
                    </div>
                    <button>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetailView;