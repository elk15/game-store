import SliderImage from "./SliderImage";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { AutoPlay, Fade } from "@egjs/flicking-plugins";
import PropTypes from 'prop-types';




const Carousel = ({carouselData}) => {
    const plugins = [new AutoPlay({ duration: 2500, direction: "NEXT", stopOnHover: true }),  new Fade()];
      
    return (
        <Flicking
            align='center'
            defaultIndex={2}
            circular={true}
            plugins={plugins}
            inputType= {["touch", "mouse"]}
        >
            {carouselData ?
                carouselData.map((game) => <SliderImage key={game.id} title={game.name} image={game.background_image} id={game.id}/>)
            :
            <>
                <SliderImage title={'My Game'} image={"./placeholder.gif"} id={0}/>
                <SliderImage title={'My Game'} image={"./placeholder.gif"} id={0}/>
                <SliderImage title={'My Game'} image={"./placeholder.gif"} id={0}/>
                <SliderImage title={'My Game'} image={"./placeholder.gif"} id={0}/>
                <SliderImage title={'My Game'} image={"./placeholder.gif"} id={0}/>
            </>
            }            
        </Flicking>
    )
  }

  Carousel.propTypes = {
    addItemToCart: PropTypes.func,
    carouselData: PropTypes.array
}
  export default Carousel;