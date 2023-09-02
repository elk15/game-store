import PropTypes from 'prop-types';
import { mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';


const GameCard = ({image, title, id, addItemToCart}) => {
    return (
        <div className='w-1/4 min-w-[180px] max-w-[256px] bg-[#ededed] shadow cursor-pointer flex flex-col'>
            <img className='object-fill flex-1
            max-w-[256px] w-full min-w-[180px] 
            lg:min-h-[144px] md:min-h-[120px] min-h-[100px]' 
            src={image == null ? './placeholder.gif' : image} alt={title}/>
            <div className='px-3 py-2 flex flex-col flex-1 justify-between'>
                <h1 >{title}</h1>
                <div className='flex items-center gap-2 justify-end'>
                    <p>$59.00</p>
                    <button data-id={id} onClick={addItemToCart}
                    aria-label='add-to-cart' className='bg-green-500 p-2 rounded-sm hover:brightness-110'>
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
    id: PropTypes.number,
    addItemToCart: PropTypes.func
}

GameCard.defaultProps = {
    addItemToCart: () => console.log('Buy!')
}

export default GameCard;