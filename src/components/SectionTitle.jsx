import Icon from '@mdi/react';
import PropTypes from 'prop-types';

const SectionTitle = ({title, icon}) => {
    return (
        <div className='pt-4 lg:w-[1024px] sm:w-[600px] w-full px-2 mb-4'>
            <h2 className='flex items-center gap-2 pb-2'>
                <Icon path={icon} size={1} /> {title}
            </h2>
            <hr className='border-neutral-400'/>
        </div>
    )
}

SectionTitle.propTypes = {
    title : PropTypes.string,
    icon: PropTypes.string
}

export default SectionTitle;