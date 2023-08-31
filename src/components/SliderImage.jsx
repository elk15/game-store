import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';

const SliderImage = ({image, title, price}) => {
    return (
        <div className="px-2 relative">
            <img className="lg:w-[1024px] lg:h-[600px] rounded-md object-cover shadow" src={image} alt={title} />
            <div className='relative 
            flex md:flex-row flex-col justify-between md:items-center gap-3
            lg:w-[1024px] text-white bottom-[100px] px-10'>
                <h1 className='md:text-3xl font-semibold'>
                    {title}
                </h1>
                <div className='flex gap-3 items-center'>
                    <p className='md:text-2xl font-semibold'>
                        {price}
                        </p>
                    <button className='flex items-center md:text-xl bg-green-500 p-3 gap-2 rounded hover:brightness-125'>
                        <Icon path={mdiCartPlus} size={1} /> Add to card
                    </button>
                </div>
            </div>
        </div>
    )
}

SliderImage.propTypes = {
    title : PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
}

export default SliderImage;