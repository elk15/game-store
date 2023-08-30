import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const Root = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(isCartOpen ? false : true);
  }

  const closeCart = () => {
    setIsCartOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  return (
    <>
      <header className='flex justify-center bg-neutral-900 opacity-90 py-4 px-3 text-neutral-300 sticky top-0 text-sm '>
        <div className="max-w-screen-lg flex flex-1 gap-3 items-center justify-between">
          {isSearchBarOpen ?
          <>
          <div className='fixed top-0 left-0 w-full h-full z-99' onClick={closeSearchBar}></div>
          <div className='flex flex-1 gap-2 items-center animate-open z-100 relative'>
            <Icon path={mdiMagnify} size={1} />
            <input type="search" name="gameSearch" className='w-full bg-transparent border-b-neutral-700 border-b-[1px]
            focus:outline-none'></input>
            </div>
          </>
          :
          <nav className='flex-1 animate-open'>
            <ul className='flex gap-7'>
              <li className='hover:text-neutral-50 tracking-wide'> <NavLink to={'/'}> HOME </NavLink> </li>
              <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/rpg'}> RPG </NavLink></li>
              <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/strategy'}> STRATEGY </NavLink></li>
              <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/shooters'}> SHOOTERS </NavLink></li>
              <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/action'}> ACTION </NavLink></li>
            </ul>
          </nav>
          }
          <div className='flex gap-5 relative flex-1 justify-end'>
            <button onClick={toggleCart} aria-label='cart' className='flex items-center hover:text-neutral-50'>
              <Icon path={mdiCartOutline} size={1} /> 0
            </button>
            {isSearchBarOpen ?
            <button onClick={closeSearchBar} aria-label='close-search' className='hover:text-neutral-50'>
            <Icon path={mdiClose} size={1} />
            </button>
            :
            <button onClick={openSearchBar} aria-label='search' className='hover:text-neutral-50'>
              <Icon path={mdiMagnify} size={1} />
            </button>
            }
              {isCartOpen &&
                <>
                <div className='fixed top-0 left-0 w-full h-full z-99' onClick={closeCart}></div>
                  <div className='absolute bg-white p-3 top-[56px] right-[30px] shadow-md z-101 animate-openfast
                    after:absolute after:bottom-full after:left-[89%] after:border-[5px] after:border-solid after:border-b-white after:border-t-transparent after:border-r-transparent after:border-l-transparent'>
                    <div className='flex flex-col items-center p-10 gap-3'>
                      <Icon path={mdiCartOutline} size={1} color={'green'}/>
                      <h3 className='text-green-600'>YOUR CART IS EMPTY</h3>
                      <hr className=' border-neutral-300 w-full'></hr>
                      <p className='text-neutral-500'>Explore great games and offers</p>
                      <button className='text-neutral-700 mt-2 border-neutral-300 border-[1px] rounded p-2 bg-neutral-200 font-semibold'>
                        BROWSE BEST SELLERS
                        </button>
                    </div>
                  </div>
                </>
              }
              
          </div>
        </div>
        
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root;
