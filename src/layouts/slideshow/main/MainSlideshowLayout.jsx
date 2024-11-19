import './MainSlideshow.scss'
import { useState, useEffect } from 'react'

function MainSlideshowLayout() {
    const imgName = 'slideshow_img'
    const imgFormat = 'png'
    const imgCount = 3

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const images = Array.from(
        { length: imgCount },
        (_, i) => `/src/images/slideshow/${imgName}_${i + 1}.${imgFormat}`
    )
    console.log(images)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgCount)
        }, 10000)

        return () => clearInterval(interval)
    }, [imgCount])

    return (
        <div className="main-slideshow">
            <div className="slideshow">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${
                            index === currentImageIndex ? 'active' : ''
                        }`}
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default MainSlideshowLayout
