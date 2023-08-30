import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';

const Root = () => {

  return (
    <>
      <header className='flex justify-center bg-neutral-900 opacity-90 py-4 text-neutral-300 sticky top-0 text-sm'>
        <div className="max-w-screen-lg flex flex-1 items-center justify-between">
          <nav className='flex-1'>
            <ul className='flex gap-5'>
              <li className='hover:text-neutral-50 tracking-wide'>HOME</li>
              <li className='hover:text-neutral-50 tracking-wide'>RPG</li>
              <li className='hover:text-neutral-50 tracking-wide'>STRATEGY</li>
              <li className='hover:text-neutral-50 tracking-wide'>SHOOTERS</li>
              <li className='hover:text-neutral-50 tracking-wide'>ACTION</li>
            </ul>
          </nav>
          <div className='flex gap-5'>
            <button aria-label='cart' className='flex items-center hover:text-neutral-50'>
              <Icon path={mdiCartOutline} size={1} /> 0
              </button>
            <button aria-label='search' className='hover:text-neutral-50'>
              <Icon path={mdiMagnify} size={1} />
              </button>
          </div>
        </div>
      </header>
      <main>

      </main>
    </>
  )
}

export default Root;
