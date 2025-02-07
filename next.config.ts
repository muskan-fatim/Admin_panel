import type { NextConfig } from "next";
import compression from 'vite-plugin-compression';

const nextConfig: NextConfig = {
images:{
  domains:["cdn.sanity.io"]
  
},
plugins: [
  compression({
    algorithm: 'gzip', // or 'brotliCompress', 'deflate', 'deflateRaw'
    threshold: 1024, // Only compress files larger than 1KB
    ext: '.gz', // Output file extension
    deleteOriginFile: false, // Set to true to delete the original uncompressed files
  })
],
eslint:{
  ignoreDuringBuilds:true
}
};

export default nextConfig;
