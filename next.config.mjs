/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "openweathermap.org",
    ],
  },
};

export default nextConfig;
