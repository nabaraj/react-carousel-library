import React, { Component } from "react";
import "./carousel.scss";
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: 0,
      currentSlide: 0,
      totalSlide: 0,
      autoScrollTimer: this.props.autoScrollTimer || 5000,
      showLeftArrow: false,
      showRightArrow: true
    };
    this.carouselTimer = "";
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.arrowMaker = this.arrowMaker.bind(this);
  }

  componentDidMount() {
    let carousel = this.carousel.getBoundingClientRect();
    let containerWidth = carousel.width;
    let carouselWidth =
      this.props.sliderType === "fullScreen"
        ? containerWidth * this.props.children.length
        : this.carouselInnerContent.getBoundingClientRect().width;
    let totalSlide = Math.ceil(carouselWidth / containerWidth);
    this.setState(
      {
        totalSlide
      },
      () => {
        this.startTimer();
      }
    );
  }
  clearTimer = () => {
    var vm = this;
    if (!vm.props.pouseMouseEnter) {
      clearInterval(vm.carouselTimer);
    }
  };
  startTimer = () => {
    const vm = this;
    if (vm.props.autoScroll) {
      this.carouselTimer = setInterval(() => {
        let carousel = this.carousel.getBoundingClientRect();

        let containerWidth = carousel.width;
        let carouselWidth =
          this.props.sliderType === "fullScreen"
            ? containerWidth * this.props.children.length
            : this.carouselInnerContent.getBoundingClientRect().width;
        let totalSlide = Math.ceil(carouselWidth / containerWidth);

        let currentSlide = vm.state.currentSlide + 1;
        if (currentSlide >= totalSlide) {
          currentSlide = 0;
        }
        let transform = 0;
        if (currentSlide * containerWidth + containerWidth > carouselWidth) {
          let prevWidth = currentSlide * containerWidth;
          transform =
            prevWidth - ((currentSlide + 1) * containerWidth - carouselWidth);
        } else {
          transform = currentSlide * containerWidth;
        }
        vm.setState(
          {
            currentSlide: currentSlide,
            transform: transform * -1,
            totalSlide
          },
          () => vm.showArrow(currentSlide)
        );
      }, vm.state.autoScrollTimer);
    }
  };
  showArrow = currentSlide => {
    if (currentSlide === 0) {
      this.setState({
        showLeftArrow: false
      });
    } else {
      this.setState({
        showLeftArrow: true
      });
    }
    if (currentSlide === this.state.totalSlide - 1) {
      this.setState({
        showRightArrow: false
      });
    } else {
      this.setState({
        showRightArrow: true
      });
    }
  };
  slideLeft(e) {
    if (e && !e.target.classList.contains("arrowClick")) {
      return;
    }
    let carousel = this.carousel.getBoundingClientRect();
    let carouselWidth = carousel.width;
    let carouselInnerWidth =
      this.props.sliderType === "fullScreen"
        ? carouselWidth * this.props.children.length
        : this.carouselInnerContent.getBoundingClientRect().width;

    let currentSlide = this.state.currentSlide - 1;
    this.setState(
      {
        totalSlide: Math.ceil(carouselInnerWidth / carouselWidth)
      },
      () => {
        this.showArrow(currentSlide);
      }
    );

    if (this.state.currentSlide !== 0) {
      if (this.state.transform + carouselWidth <= 0) {
        let currentTransform = this.state.transform;
        this.setState({
          currentSlide: currentSlide,
          transform: currentTransform + carouselWidth
        });
      } else {
        this.setState({
          currentSlide: currentSlide,
          transform: 0
        });
      }
    }
  }
  slideRight(e) {
    if (e && !e.target.classList.contains("arrowClick")) {
      return;
    }
    let carousel = this.carousel.getBoundingClientRect();
    let carouselWidth = carousel.width;
    let carouselInnerWidth =
      this.props.sliderType === "fullScreen"
        ? carouselWidth * this.props.children.length
        : this.carouselInnerContent.getBoundingClientRect().width;

    let currentSlide = this.state.currentSlide + 1;
    this.setState(
      {
        totalSlide: Math.ceil(carouselInnerWidth / carouselWidth)
      },
      () => {
        this.showArrow(currentSlide);
      }
    );

    if (this.state.currentSlide !== this.state.totalSlide - 1) {
      if (carouselWidth * (currentSlide + 1) <= carouselInnerWidth) {
        this.setState({
          currentSlide: currentSlide,
          transform: carouselWidth * currentSlide * -1
        });
      } else {
        let prevPos = this.state.transform * -1;
        this.setState({
          currentSlide: currentSlide,
          transform:
            (prevPos + (carouselInnerWidth - (prevPos + carouselWidth))) * -1
        });
      }
    }
  }
  startCarousel = () => {
    let vm = this;
    if (!vm.props.pouseMouseEnter) {
      vm.startTimer();
    }
  };
  arrowMaker(arrowType) {
    return (
      <div className="arrowBg arrowBg-left arrowClick">
        {this.props[arrowType]}
      </div>
    );
  }

  render() {
    const { showLeftArrow, showRightArrow } = this.state;
    const classes = `carousel${
      this.props.classes ? " " + this.props.classes : ""
    } 
    ${this.props.sliderType === "grid" ? "gridSlider" : ""} 
    ${this.props.sliderType === "fullScreen" ? "fullScreen-slider" : ""}`;
    const showArrowBg = this.props.showArrowBg ? true : false;
    const slideUnit = "px";
    const { hideArrow } = this.props;
    return (
      <div
        onMouseEnter={this.clearTimer}
        onMouseLeave={this.startCarousel}
        id="ns-carousel"
        ref={div => {
          this.carousel = div;
        }}
        className={classes}
      >
        {!hideArrow &&
          showLeftArrow &&
          (showArrowBg ? (
            <div
              className="arrowBg arrowBg-left arrowClick"
              onClick={this.slideLeft}
            >
              <i className="fa fa-chevron-left" />
            </div>
          ) : (
            this.arrowMaker("leftArrow")
          ))}
        {!hideArrow &&
          showRightArrow &&
          (showArrowBg ? (
            <div
              className="arrowBg arrowBg-right arrowClick"
              onClick={this.slideRight}
            >
              <i className="fa fa-chevron-right" />
            </div>
          ) : (
            this.arrowMaker("leftArrow")
          ))}
        <div
          className="carousel-inner-container"
          style={{
            transform: `translateX(${this.state.transform}${slideUnit})`
          }}
          ref={div => {
            this.carouselInnerContent = div;
          }}
        >
          {this.props.children.map((slide, index) => {
            return (
              <div className={"carousel-item"} key={index}>
                {slide}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
Carousel.defaultProps = {
  autoScroll: true,
  sliderType: "grid"
};
export default Carousel;
