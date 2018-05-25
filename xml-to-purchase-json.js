const parser = require('xml2json');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const readdir = require('fs').readdir;
const dataDir = './data/'

readdir(dataDir, (err, files) => {
  
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const promises = files.map( (file, index) => {
    return new Promise( (resolve, reject) => {
      readFile(dataDir + file, 'utf8', (err, xmlData) => {
        
        if (err) {
          return reject(err);
        }

        const jsonStr = parser.toJson(xmlData);
        const recieptObject = JSON.parse(jsonStr).autorizacion;

        const items = recieptObject.comprobante.factura.detalles.detalle;
        let recieptDetail = {}

        const purchasedItems = items.map(i => {
          i.impuestos = i.impuestos.impuesto
          return i;
        });

        recieptDetail.purchases = purchasedItems;
        writeFile(`${__dirname}/out/supermaxi-${recieptObject.fechaAutorizacion.split(' ')[0].split('/').join('-')}.json`, JSON.stringify(recieptDetail, null, 2), function (err, f) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log('done writing file', f);
          resolve(f);
        })
      });
    })
  });

  Promise.all(promises)
    .then(function () {
      console.log('done writing all files')
      process.exit(0)
    })
    .catch(function (error) {
      console.error(error);
      process.exit(-1);
    })
})
