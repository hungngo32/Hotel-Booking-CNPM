import HeroSlider, { Overlay, Slide } from "hero-slider";
import"./basicSlider.css"

const bogliasco = "https://ezcloud.vn/wp-content/uploads/2019/07/1533966485504_8785368-1.jpg";
const countyClare = "https://th.bing.com/th/id/OIP.4SQtUPJFwk50_ZfUVh1lDAHaEo?pid=ImgDet&rs=1";
const craterRock = "https://i.imgur.com/8DYumaY.jpg";
const giauPass = "https://i.imgur.com/8IuucQZ.jpg";

export default function BasicSlider() {
  return (
    <HeroSlider
      height={"40vh"}
      
      autoplay
      // controller={{
      //   initialSlide: 1,
      //   slidingDuration: 5,
      //   slidingDelay: 1,
      //   onSliding: (nextSlide) =>
      //     console.debug("onSliding(nextSlide): ", nextSlide),
      //   onBeforeSliding: (previousSlide, nextSlide) =>
      //     console.debug(
      //       "onBeforeSliding(previousSlide, nextSlide): ",
      //       previousSlide,
      //       nextSlide
      //     ),
      //   onAfterSliding: (nextSlide) =>
      //     console.debug("onAfterSliding(nextSlide): ", nextSlide)
      // }}
    >
      <Overlay>
      </Overlay>

      <Slide
        background={{
          backgroundImageSrc: giauPass
        }}
      />

      <Slide
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide

        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide
        background={{
          backgroundImageSrc: craterRock
        }}
      />
    </HeroSlider>
  );
}