import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { forwardRef } from 'react';

const SliderImage = forwardRef(function SliderImage({title, image, id, addItemToCart}, ref) {
    return (
        <div ref={ref} className="mx-2">
            <img className="lg:w-[1024px] lg:h-[600px] sm:w-[500px] sm:h-[320px] w-[360px] h-[200px] rounded-md object-fit shadow" 
            src={image == null ? './placeholder.gif' : image} alt={title} />
            <div className='relative flex lg:flex-row flex-col lg:justify-between lg:items-center
            lg:gap-3 text-white lg:bottom-[100px] bottom-[80px] lg:px-10 px-2'>
                <h1 className='lg:text-3xl font-semibold drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] mix-blend-luminosity'>
                    {title}
                </h1>
                <div className='flex gap-3 items-center'>
                    <p className='lg:text-2xl font-semibold drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]'>
                        $59.99
                        </p>
                    <button data-id={id} onClick={addItemToCart}
                    className='flex items-center lg:text-xl bg-green-500 lg:p-3 lg:gap-2 p-2 rounded hover:brightness-110'>
                        <Icon path={mdiCartPlus} size={1} /> Add to card
                    </button>
                </div>
            </div>
        </div>
    )
});

SliderImage.propTypes = {
    title : PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    addItemToCart: PropTypes.func
}

export default SliderImage;
