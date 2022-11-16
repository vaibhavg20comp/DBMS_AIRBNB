/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['a0.muscache.com' , 'a1.muscache.com','a2.muscache.com','res.cloudinary.com'],
  },
  env:{
    mapbox_key:'pk.eyJ1IjoidmFpYmhhdmcyMGNvbXAiLCJhIjoiY2xhaHZpOGtoMDN5YjNxbWtuc3I0cGh1ZSJ9.5jVoNxjHjywGAVWnbw_DOw',
    cloud_name:'dpathhyfs',
    cloud_api_key:'349822485142156',
    cloud_api_secret:'Pe36aSGVK01J0yUlqP4wCYIEHHM'
  },
  reactStrictMode: false,
  
  swcMinify: true,
}

module.exports = nextConfig
