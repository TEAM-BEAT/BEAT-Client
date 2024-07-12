import carouselImg from "../../../../assets/images/banner_roll.png";

interface PromotionProps {
  promotionId: number;
  promotionPhoto: string;
  performanceId: number;
}

interface PromotionComponentProps {
  promotionList: PromotionProps[];
}

const ImgList = [carouselImg, carouselImg, carouselImg, carouselImg, carouselImg];

const Carousel = (promotionList: PromotionComponentProps) => {
  return <div></div>;
};

export default Carousel;
