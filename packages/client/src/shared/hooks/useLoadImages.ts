import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { ImageSources } from 'shared/hooks/types'

type ImagesRef = MutableRefObject<{ [key: string]: HTMLImageElement | null }>

const useLoadImages = (imageSources: ImageSources): [ImagesRef, boolean] => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)
  const imagesRef = useRef<{ [key: string]: HTMLImageElement | null }>({})

  useEffect(() => {
    const loadImages = () => {
      const images: { [key: string]: HTMLImageElement } = {}
      let imagesLoaded = 0
      const totalImages = Object.keys(imageSources).length

      Object.entries(imageSources).forEach(([key, src]) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          images[key] = img
          imagesLoaded++
          if (imagesLoaded === totalImages) {
            imagesRef.current = images
            setIsImagesLoaded(true)
          }
        }
      })
    }
    loadImages()
  }, [imageSources])

  return [imagesRef, isImagesLoaded]
}

export default useLoadImages
