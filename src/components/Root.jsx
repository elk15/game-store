import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Root = ({cart, allGames, addItemToCart}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    setSearchInput('');
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  

  useEffect(() => {
    if (searchInput.length > 1) {
      const searchForGames = (query) => {
        return allGames.filter((game) => game.name.toLowerCase().includes(query.toLowerCase()));
      }
      setSearchResults(searchForGames(searchInput));
    }

    if (searchInput.length < 2) {
      setSearchResults([]);
    }

  }, [searchInput, allGames])

  return (
    <>
      <header className='z-[100] opacity-95 flex justify-center bg-neutral-900  py-4 px-3 text-neutral-300 sticky top-0 text-sm '>
        <div className="max-w-screen-lg flex flex-1 gap-3 items-center justify-between">
          {isSearchBarOpen ?
          <>
          <div  data-testid = "overlay" className='z-[101] fixed top-0 left-0 w-full h-full' onClick={closeSearchBar}></div>
          <div className='z-[102] flex flex-1 gap-2 items-center animate-open relative'>
            <Icon path={mdiMagnify} size={1} />
            <input type="search" autoComplete='off' name="gameSearch" value={searchInput} onChange={handleSearchInputChange}
            className='w-full bg-transparent border-b-neutral-700 border-b-[1px]
            focus:outline-none'></input>
          </div>
          {searchInput.length > 1 &&
          <div className='z-[102] lg:absolute lg:top-[60px] top-[55px] text-black bg-white p-3 animate-openfast
          flex flex-col lg:max-w-[500px] rounded fixed left-0 lg:left-auto w-full h-full lg:h-auto'>
            <h2 className='font-semibold text-xl mb-2'>
              {searchResults.length} Games found
            </h2>
            <ul>
              {searchResults.map((game) => {
                return  <li key={game.id} data-id={game.id} onClick={addItemToCart}
                className='flex cursor-pointer p-3 justify-between border-t-2'>
                          <div>
                            <h3 className="font-semibold">{game.name}</h3>
                            <div className='text-neutral-500'>
                              {game.released.split('-')[0]} {" "}
                              {game.genres.map(genre => genre.name).join(', ')}
                            </div>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <button className='rounded border-[1px] border-neutral-400 p-1 text-neutral-500
                            hover:bg-green-400 hover:text-white hover:border-green-400'>
                              $59.99</button>
                          </div>
                        </li>})}
            </ul>
          </div>}
          </>
          :
          <nav className='flex-1 animate-open hidden md:block font-semibold'>
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
            <button onClick={toggleCart} aria-label='cart' className='z-[102] flex items-center hover:text-neutral-50'>
              <Icon path={mdiCartOutline} size={1} /> {cart.length}
            </button>
            {isSearchBarOpen ?
            <button onClick={closeSearchBar} aria-label='close-search' className='z-[101] hover:text-neutral-50'>
            <Icon path={mdiClose} size={1} />
            </button>
            :
            <button onClick={openSearchBar} aria-label='open-search' className='hover:text-neutral-50'>
              <Icon path={mdiMagnify} size={1} />
            </button>
            }
            {isMobileMenuOpen?
              <button onClick={closeMobileMenu} aria-label='close-menu' className='hover:text-neutral-50 block md:hidden'>
              <Icon path={mdiClose} size={1} />
              </button>
              :
              <button onClick={openMobileMenu} aria-label="open-menu" className='block md:hidden'>
              <Icon path={mdiMenu} size={1} />
              </button>
            }
            
              {isCartOpen &&
                <>
                <div  data-testid = "overlay" className='z-[101] fixed top-0 left-0 w-full h-full' onClick={closeCart}></div>
                  <div className='absolute bg-white p-3 top-[56px] right-[30px] shadow-md z-[103] animate-openfast
                    after:absolute after:bottom-full after:left-[89%] after:border-[5px] after:border-solid after:border-b-white after:border-t-transparent after:border-r-transparent after:border-l-transparent'>
                    {cart.length === 0 ?
                    <div className='flex flex-col items-center p-10 gap-3'>
                      <Icon path={mdiCartOutline} size={1} color={'green'}/>
                      <h3 className='text-green-600'>YOUR CART IS EMPTY</h3>
                      <hr className=' border-neutral-300 w-full'></hr>
                      <p className='text-neutral-500'>Explore great games and offers</p>
                      <button className='text-neutral-700 mt-2 border-neutral-300 border-[1px] rounded p-2 bg-neutral-200 font-semibold'>
                        BROWSE BEST SELLERS
                      </button>
                    </div>
                      :
                      <ul>
                      {cart.map((item) => {
                        return <li key={item.id} className="text-black">
                            {item.name}
                          </li>;
                      })}
                      </ul>
                    } 
                  </div>
                </>
              }
              
          </div>
        </div>
        
      </header>
      <main className='md:flex md:flex-col md:items-center overflow-x-hidden'>
        {isMobileMenuOpen ?
          <nav className='flex-1 animate-open flex justify-center 
           border-t-neutral-500 border-t-[1px] bg-neutral-900 text-neutral-300 h-screen pt-5'>
          <ul className='flex gap-7 flex-col items-center'>
            <li className='hover:text-neutral-50 tracking-wide'> <NavLink to={'/'}> HOME </NavLink> </li>
            <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/rpg'}> RPG </NavLink></li>
            <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/strategy'}> STRATEGY </NavLink></li>
            <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/shooters'}> SHOOTERS </NavLink></li>
            <li className='hover:text-neutral-50 tracking-wide'><NavLink to={'/games/action'}> ACTION </NavLink></li>
          </ul>
        </nav>
        :
        <Outlet />
        }
      </main>
      <footer className='bg-neutral-900 py-3 text-white text-center mt-3'>By elk15 - 2023</footer>
    </>
  )
}

Root.propTypes = {
  cart: PropTypes.array,
  allGames: PropTypes.array,
  addItemToCart: PropTypes.func
}

export default Root;
