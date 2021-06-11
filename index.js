const { response } = require('express')
const express = require('express')
const handlebars = require('express-handlebars')
const puppeteer = require('puppeteer')
const app = express()
const port = 3000

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('template', req.body)
})

app.post('/certificado', async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0'
  })
  
  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
    margin:{
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  })

  await browser.close()

  response.contentType("application/pdf")  

  return response.send(pdf)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
