Scripting Examples with NodeJS
================================

###Description

The purpose of this project is to showcase how to parse multiple XML file with NodeJS to extract information and convert into a JSON file. 

Supermaxi is a grocery chain in Ecuador, they emit their receipts in both XML and PDF format. In order to get a better feel for the prices of items and how they change I have writtent these scripts to ingest and analyze the information.


###Running the Scripts

The first script, `group-purchases.js`, ingests the data and will group all purchases by the field `descripcion` in the XML file. 

The output is printed to the terminal as a JSON array. 


Running the script is as simple as entering the directoy and running the command below (given that there is an xml in the `/data/` directory in a valid format.)

``` node group-purchases.js ```

__Output__

```
[
  {
    "item": "TOMATE RINON GRANEL",
    "count": 4,
    "prices": [
      1.3759,
      1.4085,
      1.375,
      1.3758
    ],
    "averageCost": 1.3838
    },
  {
    "item": "CEB.PAITE.BLANCA EMPACADA",
    "count": 1,
    "prices": [
      1.5455
    ],
    "averageCost": 1.5455
  },
  {
    "item": "CARNE MOLIDA TIPO I 14-15% 1KG RES",
    "count": 4,
    "prices": [
      3.2,
      3.14,
      2.52,
      3.23
    ],
    "averageCost": 3.0225
  },
  {
    "item": "PIMIENTO GRANEL",
    "count": 3,
    "prices": [
      1.2439,
      1.0538,
      1.3818
    ],
    "averageCost": 1.2265
  },
  {
    "item": "PIMIENTO ROJO GRANEL",
    "count": 5,
    "prices": [
      1.8056,
      2.7636,
      2.7719,
      1.5043,
      2.4685
    ],
    "averageCost": 2.2627800000000002
  },
  {
    "item": "ORG ECUAORGANIC AJI GRANDE",
    "count": 1,
    "prices": [
      0.49
    ],
    "averageCost": 0.49
  },
  {
    "item": "GREENGARDEN AGUACATE MADURO",
    "count": 2,
    "prices": [
      1.44,
      1.44
    ],
    "averageCost": 1.44
  },
  {
    "item": "CEBOLLA PAITENA BLANCA GRANEL",
    "count": 6,
    "prices": [
      1.0909,
      1.2593,
      1.1619,
      1.381,
      1.4762,
      1.3053
    ],
    "averageCost": 1.2791000000000001
  }
]
```


The second script, `xml-to-json.js`, takes the input xml files and outputs a new JSON file labeled their emission date containing only the information pertaining to the purchases. 

``` node xml-to-json.js ```

```
"purchases": [
{
    "codigoPrincipal": "269054",
    "codigoAuxiliar": "269054",
    "descripcion": "S.MOLIDA TIPO I 14-15% RES..",
    "cantidad": "1.0000",
    "precioUnitario": "2.0500",
    "descuento": "0.00",
    "precioTotalSinImpuesto": "2.05",
    "impuestos": {
    "codigo": "2",
    "codigoPorcentaje": "0",
    "tarifa": "0.00",
    "baseImponible": "2.05",
    "valor": "0.00"
    }
},
{
    "codigoPrincipal": "786102580497",
    "codigoAuxiliar": "786102580497",
    "descripcion": "CHIVERIA YOGUR DURAZNO",
    "cantidad": "1.0000",
    "precioUnitario": "0.6600",
    "descuento": "0.13",
    "precioTotalSinImpuesto": "0.53",
    "impuestos": {
    "codigo": "2",
    "codigoPorcentaje": "0",
    "tarifa": "0.00",
    "baseImponible": "0.53",
    "valor": "0.00"
    }
}
... 
]
```