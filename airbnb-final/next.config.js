/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['a0.muscache.com' , 'a1.muscache.com','a2.muscache.com'],
  },
  env:{
    mapbox_key:'pk.eyJ1IjoidmFpYmhhdmcyMGNvbXAiLCJhIjoiY2xhaHZpOGtoMDN5YjNxbWtuc3I0cGh1ZSJ9.5jVoNxjHjywGAVWnbw_DOw',
  },
  reactStrictMode: false,
  
  swcMinify: true,
}

module.exports = nextConfig
