import SliderImage from "./SliderImage";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { AutoPlay, Fade } from "@egjs/flicking-plugins";




const Carousel = () => {
    const plugins = [new AutoPlay({ duration: 2500, direction: "NEXT", stopOnHover: true }),  new Fade()];
      
    return (
        <Flicking
            align='center'
            defaultIndex={2}
            circular={true}
            plugins={plugins}
            inputType= {["touch", "mouse"]}
        >
            <SliderImage title={'My Game'} price={'4.99$'} image={"./placeholder.jpg"}/>
            <SliderImage title={'My Game'} price={'4.99$'} image={"./placeholder.jpg"}/>
            <SliderImage title={'My Game'} price={'4.99$'} image={"./placeholder.jpg"}/>
            <SliderImage title={'My Game'} price={'4.99$'} image={"./placeholder.jpg"} />
            <SliderImage title={'My Game'} price={'4.99$'} image={"./placeholder.jpg"} />
        </Flicking>
    )
  }

  export default Carousel;