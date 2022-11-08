/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['a0.muscache.com' , 'a1.muscache.com','a2.muscache.com'],
  },
  reactStrictMode: false,
  
  swcMinify: true,
}

module.exports = nextConfig
