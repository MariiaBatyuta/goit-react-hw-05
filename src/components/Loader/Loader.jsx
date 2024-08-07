import { ColorRing } from "react-loader-spinner";
import css from './Loader.module.css';

export default function Loader() {
    return (
        <div className={css.loaderContainer}>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#000000', '#000000', '#000000', '#000000', '#000000']}
            />
        </div>
    );
}