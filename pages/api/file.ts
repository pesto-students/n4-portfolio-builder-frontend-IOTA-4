import formidable from 'formidable'
import fs from 'fs'
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export const config = {
  api: {
    bodyParser: false,
  },
}

const post = async (req: any, res: any) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    const fileUrl = await saveFile(files.file, req)
    return res.status(201).json({ fileUrl })
  })
}

const saveFile = async (file: any, req: any) => {
  const data = fs.readFileSync(file.path)
  const fileName = `${file.name}`

  fs.writeFileSync(`./public/${fileName}`, data)
  await fs.unlinkSync(file.path)
  return 'https://' + req.headers.host + '/' + fileName
}

export default async (req: any, res: any) => {
  await cors(req, req)
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('')
}
