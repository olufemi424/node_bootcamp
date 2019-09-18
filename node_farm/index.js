const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const  replaceTemplate = require('./modules/replaceTemplate')

////////////////////////////////////////////////
// Files
////////////////////////////////////////////////

//Blocking, Synchronous way
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8')
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written!')

//Non-blocking Asynchronous way
// fs.readFile('./txt/start.txt','utf-8', (err, data1)=>{
//    if(err) return console.log('Error! 🔥')
//    fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2)=>{
//       console.log(data2)
//       fs.readFile(`./txt/append.txt`,'utf-8', (err, data3)=>{
//          console.log(data3)
//          fs.writeFile('./txt/final.txt',`${data2} \n ${data3}`,'utf-8', err=>{
//             console.log('File written')
//          })
//       })
//    })
// })
// console.log('Will read file')

////////////////////////////////////////////////
// Server
////////////////////////////////////////////////


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)


// url slugs
const slugs = dataObj.map(el=>slugify(el.productName, {lower: true}))
dataObj.forEach((el, i) => el['slug'] = slugs[i]);

const server = http.createServer((req, res)=>{

const {query, pathname} = url.parse(req.url,true)

   //overview
 if (pathname === '/' || pathname === '/overview' ){
   res.writeHead(200, {'Content-type':'text/html'})

   const cardHtml = dataObj.map(el=> replaceTemplate(tempCard, el)).join('')
   const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml)
   res.end(output)

    // product page
 }else if(pathname === '/product' ){
   res.writeHead(200, {'Content-type':'text/html'})

   const id = dataObj.findIndex(el => el.slug === query.id);
   const product = dataObj[id];
   const output = replaceTemplate(tempProduct, product);
   res.end(output);

   //api
}else if(pathname === '/api' ){
    res.end(data)

   //not found
 }else{
    res.writeHead(404, {
       'Content-type':'text/html',
       'my-own-header':'Hello-world'
    })
    res.end('<h1>Page not found</h1>')
 }
})

server.listen(8000,'127.0.0.1', ()=>{
   console.log('server started listening on port: 8080 \nhttp://127.0.0.1:8000')
})


