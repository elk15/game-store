import PropTypes from 'prop-types';
import { mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';


const GameCard = ({image, title, price}) => {
    return (
        <div className='w-1/4 min-w-[180px] max-w-[256px] bg-[#ededed] shadow cursor-pointer'>
            <img className='object-contain' src={image} alt={title}/>
            <div className='px-3 py-2 flex flex-col'>
                <h1 >{title}</h1>
                <div className='flex items-center justify-end gap-2'>
                    <p>{price}</p>
                    <button aria-label='add-to-cart' className='bg-green-500 p-2 rounded-sm hover:brightness-110'>
                        <Icon path={mdiCartPlus} size={1} color={'white'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

GameCard.propTypes = {
    title : PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
}

export default GameCard;