const parser = require('xml2json');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const readdir = require('fs').readdir;
const dataDir = './data/'


function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

}
readdir(dataDir, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(-1);
  }
  const promises = files.map(function (file, index) {
    return new Promise(function (resolve, reject) {
      readFile(dataDir + file, 'utf8', function (err, xmlData) {
        const jsonStr = parser.toJson(xmlData);
        const recieptXML = JSON.parse(jsonStr).autorizacion.comprobante;
        const recieptObject = recieptXML

        if (err) {
          console.error(err);
          process.exit(-1);
        }

        const items = recieptObject.factura.detalles.detalle;

        const purchasedItems = items.map(i => {
          i.impuestos = i.impuestos.impuesto
          return i;
        });

        return resolve(purchasedItems);
      });
    })
  });
  Promise.all(promises)
    .then(function (data) {
      // flatten data
      data = data.reduce(function (a, b) {
        return a.concat(b);
      });

      const grouped = groupBy(data, 'descripcion');
      const count = Object.keys(grouped).map(function (k) {
        return {
          item: k,
          count: grouped[k].length,
          prices: grouped[k].map(p => parseFloat(p.precioUnitario)),
          averageCost: grouped[k].map(p => parseFloat(p.precioUnitario)).reduce(function (a, b) {
            return a + b
          }, 0) / grouped[k].length
        }
      });

      console.log(JSON.stringify(count, null, 2))
      process.exit(0)
    })
    .catch(function (error) {
      console.error(error);
      process.exit(-1);
    })
});
