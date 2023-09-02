import SectionTitle from "./SectionTitle";
import GameCard from "./GameCard";
import { mdiMarker } from '@mdi/js';
import { mdiBullhorn } from '@mdi/js';
import { mdiFire } from '@mdi/js';
import { mdiStar } from '@mdi/js';
import { mdiCompass } from '@mdi/js';
import PropTypes from 'prop-types';
import Carousel from "./Carousel";


const Home = ({addItemToCart, carouselData, newReleasesData, hotPicksData, bestSellingData, upcomingData}) => {
    
    return (
        <>
            <section className="flex flex-col justify-center items-center lg:h-[690px] sm:h-[400px] h-[280px]">
                <SectionTitle title={'Highlights'} icon={mdiMarker}/>
                <Carousel carouselData={carouselData}/>
            </section>
            <section className="flex flex-col justify-center items-center mb-3">
                <SectionTitle title={'New Releases'} icon={mdiBullhorn}/>
                <div className="flex flex-wrap justify-center gap-3 max-w-[1200px]">
                    {newReleasesData ?
                        newReleasesData.map((game) => <GameCard key={game.id} title={game.name} image={game.background_image} id={game.id} />)
                    :
                    <>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                    </>
                    }
                </div>
            </section>
            <section className="flex flex-col justify-center items-center mb-3">
                <SectionTitle title={'Hot Picks'} icon={mdiFire}/>
                <div className="flex flex-wrap justify-center gap-3 max-w-[1200px]">
                    {hotPicksData ?
                        hotPicksData.map((game) => <GameCard key={game.id} title={game.name} image={game.background_image} id={game.id} />)
                    :
                    <>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                    </>
                    }
                </div>
            </section>
            <section className="flex flex-col justify-center items-center mb-3">
                <SectionTitle title={'Best Selling'} icon={mdiStar}/>
                <div className="flex flex-wrap justify-center gap-3 max-w-[1200px]">
                    {bestSellingData ?
                        bestSellingData.map((game) => <GameCard key={game.id} title={game.name} image={game.background_image} id={game.id} />)
                    :
                    <>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                    </>
                    }
                </div>
            </section>

            <section className="flex flex-col justify-center items-center mb-3">
                <SectionTitle title={'Upcoming'} icon={mdiCompass}/>
                <div className="flex flex-wrap justify-center gap-3 max-w-[1200px]">
                    {upcomingData ?
                        upcomingData.map((game) => <GameCard key={game.id} title={game.name} image={game.background_image} id={game.id} />)
                    :
                    <>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                        <GameCard title={'My Game'} price={'$59.99'} image={'./placeholder.gif'} id={0}></GameCard>
                    </>
                    }
                </div>
            </section>
        </>
    )
}

Home.propTypes = {
    addItemToCart: PropTypes.func,
    carouselData: PropTypes.array,
    newReleasesData: PropTypes.array,
    hotPicksData: PropTypes.array,
    bestSellingData: PropTypes.array,
    upcomingData: PropTypes.array
}

export default Home;