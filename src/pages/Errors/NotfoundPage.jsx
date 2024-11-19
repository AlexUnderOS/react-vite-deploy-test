import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import './NotfoundPage.css'

function NotfoundPage() {
    return (
        <div className="notfound-page">
            <h2>Sorry,</h2>
            <p>
                But we don{"'"}t find this page 
                <FontAwesomeIcon className="sad-face" icon={faFaceFrown} />
            </p>
        </div>
    )
}

export default NotfoundPage
