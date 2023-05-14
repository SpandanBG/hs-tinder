
import LoaderAnimation from '../../vid/loader.svg'

const LoaderPage = ({matches}) => {
    return (
        <div className='page-container'>
            <img src={LoaderAnimation} className='loader-img'/>
        </div>
    )
}

export {LoaderPage}