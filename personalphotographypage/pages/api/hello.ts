// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import NextCors from 'nextjs-cors';
import { resolve } from 'path';
import {v2 as cloudinary} from 'cloudinary';


type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {

  const options = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }

  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

    // Get details about the asset
  // const result = await cloudinary.api.resources(options, (err, response) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.send(response)
  //   }
  // });
  // return result;

  axios.get(process.env.CLOUDINARY_QUERY!)
    .then(response => res.send(response.data))
    .catch(err => console.error(err))
}
