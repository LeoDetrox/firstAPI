const express = require('express');
const puppeteer = require('puppeteer');
const port = process.env.PORT || 3000;

const server = express();

server.use(express.json());

server.get('/usuario', (req,res) => {
    return res.json({usuario: 'Cleber Leonardo'})
});

server.post('/conversor', async (req,res) => {
    const html = req.body.html;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        
        const pdfBuffer = await page.pdf();
        await browser.close();
    
        //res.set('Content-Disposition', 'attachment;filename="converted.pdf"');
        //res.set('Content-Type', 'application/pdf');
        return res.json({ConvertedString: pdfBuffer.toString('base64')});
        //console.log(pdfBuffer.toString('base64'));
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to convert HTML to PDF' });
      }

});

server.listen(port, () => {
    console.log('Servidor funcionando...')
});