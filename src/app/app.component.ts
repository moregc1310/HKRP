import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})



export class AppComponent implements OnInit{

   ssidData = [[{
    "SSID": 7,
    "NAME": "66kV SS-7",
    "Cir_Name": "GJ",
    "Div_Name": "ADI",
    "ISACT": true,
    "LAT": "23.49213",
    "LONG": "72.455771",
    "FeederInfo": [
      {
        "LID": 11,
        "name": "11kV FDR-11",
        "ISACT": true,
        "ISPDC": false
      },
      {
        "LID": 21,
        "name": "11kV FDR-21",
        "ISACT": true,
        "ISPDC": false
      },
      {
        "LID": 31,    
        "name": "11kV FDR-31",
        "ISACT": true,
        "ISPDC": false
      }
    ]
  },
  {
    "SSID": 17,
    "NAME": "66kV SS-17",
    "Cir_Name": "GJ",
    "Div_Name": "GND",
    "ISACT": true,
    "LAT": "23.49213",
    "LONG": "72.455771",
    "FeederInfo": [
      {
        "LID": 12,
        "name": "11kV FDR-12",
        "ISACT": true,
        "ISPDC": false
      },
      {
        "LID": 22,
        "name": "11kV FDR-22",
        "ISACT": true,
        "ISPDC": false
      }
    ]
  },
  {
    "SSID": 27,
    "NAME": "66kV SS-27",
    "Cir_Name": "GJ",
    "Div_Name": "KHL",
    "ISACT": true,
    "LAT": "23.49213",
    "LONG": "72.455771",
    "FeederInfo": [
      {
        "LID": 13,
        "name": "11kV FDR-13",
        "ISACT": false,
        "ISPDC": false
      },
      {
        "LID": 23,
        "name": "11kV FDR-23",
        "ISACT": true,
        "ISPDC": false
      },
      {
        "LID": 33,    
        "name": "11kV FDR-33",
        "ISACT": true,
        "ISPDC": false
      }
    ]
  }
  ]]; 
 messageData = [[
  {
    "SSID": "7",
    "message": {
      "msgts": "2023-08-16 10:11:06",
      "levrefid": 7,
      "data": [
        [
          "LID",
          "11,21,31"
        ],
        [
          "IR",
          "1.1,1.3,1.6"
        ],
        [
          "IB",
          "1.55,1.12,"
        ],
        [
          "IY",
          ",1.53,1.12"
        ],
        [
          "VR",
          "6.3313,6.2959,6.2991"
        ],
        [
          "VY",
          ",6.2991,6.2959"
        ],
        [
          "VB",
          ",6.2842,"
        ],
        [
          "KWR",
          "-9.7,-10.1,-7.03"
        ],
        [
          "KWY",
          "-9.61,-6.95,"
        ],
        [
          "KWB",
          ",-9.7,"
        ],
        [
          "DTTM",
          "20230816100500,20230816100700,20230816101000,"
        ]
      ]
    }
  },
  {
    "SSID": "17",
    "message": {
      "msgts": "2023-08-16 10:11:06",
      "levrefid": 17,
      "data": [
        [
          "LID",
          "12,22,32"
        ],
        [
          "IR",
          "1.1,1.3,1.6"
        ],
        [
          "IB",
          "1.55,1.12,"
        ],
        [
          "IY",
          ",1.53,1.12"
        ],
        [
          "VR",
          "6.3313,6.2959,6.2991"
        ],
        [
          "VY",
          ",6.2991,6.2959"
        ],
        [
          "VB",
          ",6.2842,"
        ],
        [
          "KWR",
          "-9.7,-10.1,-7.03"
        ],
        [
          "KWY",
          "-9.61,-6.95,"
        ],
        [
          "KWB",
          ",-9.7,"
        ],
        [
          "DTTM",
          "20230817100500,20230817100700,20230817101000,"
        ]
      ]
    }
  },
  {
    "SSID": "27",
    "message": {
      "msgts": "2023-08-16 10:11:06",
      "levrefid": 27,
      "data": [
        [
          "LID",
          "13,23,33"
        ],
        [
          "IR",
          "1.1,1.3,1.6"
        ],
        [
          "IB",
          "1.55,1.12,"
        ],
        [
          "IY",
          ",1.53,1.12"
        ],
        [
          "VR",
          ",6.2991,6.2959"
        ],
        [
          "VY",
          "6.3313,6.2959,6.2991"
        ],
        [
          "VB",
          ",6.2842,"
        ],
        [
          "KWR",
          "-9.61,-6.95,"
        ],
        [
          "KWY",
          "-9.7,-10.1,-7.03"
        ],
        [
          "KWB",
          ",-9.7,"
        ],
        [
          "DTTM",
          "20230818100500,20230818100700,20230818101000,"
        ]
      ]
    }
  }
]]; 


 displayedColumns: string[] = [
  'SSID',
  'SSname',
  'CircleName',
  'DivName',
  'FeederName',
  'DateTime',
  'IR',
  'IY',
  'IB',
  'VR',
  'VY',
  'VB',
  'KWR',
  'KWY',
  'KWB'
];

dataSource = new MatTableDataSource<any>();

 

  constructor() {}
  
  ngOnInit(): void {

    
    const mergedDataArray = this.mergeData();
    this.dataSource.data = mergedDataArray;
  }

  
 
 
  mergeData() {
    const mergedData:any = [];
    this.ssidData.forEach((ssidItem) => {
      const ssid = ssidItem[0].SSID.toString();
      const messageItem = this.messageData.find((message) => message[0].SSID === ssid);
      console.log('SSID:', ssid);
      if (messageItem) {
        mergedData.push({
          SSID: ssidItem[0].SSID,
          SSname: ssidItem[0].NAME,
          CircleName: ssidItem[0].Cir_Name,
          DivName: ssidItem[0].Div_Name,
          FeederName: ssidItem[0].FeederInfo.map((feeder) => feeder.name).join(', '),
          DateTime: messageItem[0].message.msgts,
          IR: messageItem[0].message.data[1][1],
          IY: messageItem[0].message.data[3][1],
          IB: messageItem[0].message.data[2][1],
          VR: messageItem[0].message.data[4][1],
          VY: messageItem[0].message.data[5][1],
          VB: messageItem[0].message.data[6][1],
          KWR: messageItem[0].message.data[7][1],
          KWY: messageItem[0].message.data[8][1],
          KWB: messageItem[0].message.data[9][1]
        });
      }
    });
  
    return mergedData;
  }
  

  

}
