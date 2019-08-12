# React Carousel Component

[![GitHub issues](https://img.shields.io/github/issues/nabaraj/react-carousel-package)](https://github.com/nabaraj/react-carousel-package/issues)[![GitHub forks](https://img.shields.io/github/forks/nabaraj/react-carousel-package)](https://github.com/nabaraj/react-carousel-package/network)[![GitHub stars](https://img.shields.io/github/stars/nabaraj/react-carousel-package)](https://github.com/nabaraj/react-carousel-package/stargazers)[![GitHub license](https://img.shields.io/github/license/nabaraj/react-carousel-package)](https://github.com/nabaraj/react-carousel-package)

Install React Carousel Component by

```
npm i react-carousel-package
```

Then add carousel like below example.

```
<Carousel autoScroll={false} showArrowBg={true} sliderType="grid">
        <img src="https://via.placeholder.com/300X400&text=slide1" alt="" />
        <img src="https://via.placeholder.com/300X400&text=slide2" alt="" />
        <img src="https://via.placeholder.com/300X400&text=slide3" alt="" />
        <img src="https://via.placeholder.com/300X400&text=slide4" alt="" />
</Carousel>
```

This carousel currently have two view options “fullScreen” and “grid”

There are some options to control display and functionality from parent components as props they are :

```
autoScroll={false} (enable disable autoscroll)
showArrowBg={true} enable arrowbox (may be this option we can replace)
sliderType=”grid” (type of slide fullscreen or grid to control the slider)
classes=”” To add class
```
