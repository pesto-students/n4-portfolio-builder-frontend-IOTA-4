import formidable from 'formidable'
import fs from 'fs'

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

export default (req: any, res: any) => {
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
