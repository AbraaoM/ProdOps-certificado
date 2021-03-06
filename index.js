
const express = require('express')
const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const handlebars = require('express-handlebars')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const axios = require('axios')

const app = express()
const port = process.env.PORT || 8000;

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())

app.post('/certificado', async (req, res) => {

  const templateHTML = await axios({
                              method: "get",
                              url: req.body.template,
                              responseType: "blob",
                            })                         

  const template = hb.compile(templateHTML.data, { strict: true })

  const html = template(req.body.data)

  const browser = await puppeteer.launch({
                                          headless: true,
                                          defaultViewport: null,
                                          args: [
                                              "--incognito",
                                              "--no-sandbox",
                                              "--single-process",
                                              "--no-zygote"
                                          ],
                                        })

  const page = await browser.newPage()

  await page.setContent(html)

  const pdf = await page.pdf({
    path: 'certificado.pdf',
    printBackground: true,
    format: 'a4',
    margin:{
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  })

  await browser.close()

  res.contentType("application/pdf") 
  
  return res.send(pdf)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
