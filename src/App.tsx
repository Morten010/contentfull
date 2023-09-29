import { useState, useEffect } from 'react'
import './App.css'
import { client } from './utils/contentfull'
import { PageEntryProps } from './types'

type dataProps = {
  title?: string
  image?: {
    src: string
    alt: string
  }
  desc?: string
  gallery?: {
    src: string
    alt: string
  }[]
}

function App() {
  const [data, setData] = useState<dataProps>({})

  
  

  useEffect(() => {
    client.getEntry('KWQzBoQr1lBbXHatwJkxH')
    // @ts-ignore
    .then((entry: PageEntryProps) => {
      console.log(entry);
      
      setData({
        title: entry.fields.title as string,
        image: {
          src: entry.fields.image!.fields.file.url as string,
          alt: entry.fields.image!.fields.title as string,
        },
        desc: entry.fields.desc as string,
        gallery: entry.fields.gallery.map(photo => {
          return {
            alt: photo.fields.title,
            src: photo.fields.file.url,
          }
        })
      })
    })
    .catch(console.error);
  }, [])
  
  if(!data){
    return <p>Loading...</p>
  }

  
  
  return (
    <div
    className='max-w-[1080px] p-2 mx-auto min-h-screen'
    >
      <div
      className='relative aspect-video grid place-content-center'
      >
        <h1 
        className='z-10 text-5xl font-semibold'
        >
          {data.title}
        </h1>
        <img 
        src={data.image?.src} 
        alt={data.image?.alt} 
        className='absolute w-full h-full top-0 left-0 -z-10 opacity-90'
        />
      </div>
      <p>{data.desc}</p>
      <div
      className="gallery"
      >
        {data.gallery?.map((img, index) => (
          <img src={img.src} alt={img.alt} key={img.alt + index} className='aspect-video object-cover' />
        ))}
      </div>
    </div>
  )
}

export default App
