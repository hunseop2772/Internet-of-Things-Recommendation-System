// const cosine = function(arrObj1,arrObj2) {
//     var user1 = arrObj1.data,
//     user2 = arrObj2.data,
//     user1_recipe = null,
//     user2_recipe = null,
//     numerator = 0,//분자값
//     denominator = 0,//분모값
//     user1_pow_total = 0,
//     user2_pow_total = 0
    
//     for(var x in user1) {
//         user1_recipe = user1[x].recipe_id;
//         user1_pow_total += pow(user1[x].count,2);
//         for(var y in user2) {
//             user2_recipe = user2[y].recipe_id;
//             user2_pow_total += pow(user2[y].count,2);
//             if(user1_recipe === user2_recipe) {
//                 numerator += (user1[x].count) * (user2[y].count);
//                 break;
//             }
//         }
//     }
    
//     denominator = sqrt(user1_pow_total) * sqrt(user2_pow_total);

//     return numerator / denominator;

// },pow = function(data,squared) {
//     return Math.pow(data,squared);
// },sqrt = function(data) {
//     return Math.sqrt(data);
// },fs = require('fs')
// ,cheerio = require('cheerio'),
// readFile = function (data) {
//     var result = null;
//     result = fs.readFileSync(__dirname+'/public/'+data,'utf-8',(err,data) => {
//         if(err) {
//             throw err;
//         }
//     });
//     return result;
// },cheerioLoad = function(fs) {
//     var result = cheerio.load(fs);
//     return result;
// },jsonParse = function(file) {
//     var result;
//     result = JSON.parse(file);
//     return result;
// },sameKeyObjectInArray = function(arr,predi) {
//     var result = null;
//     for(var i = 0,len= arr.length;i<len;i++)
//     {  
//        result = predi(arr[i]);
//        if(result) {
//             break;
//        }
//     }
//     return result;
// }
// ibCF = (function () {
//     function ibCF() {};
//     ibCF.prototype.excute = function(target_recipe){ 
//         var recipe_arr = jsonParse(readFile('item_based_CF.json'));
//         var result = sameKeyObjectInArray(recipe_arr,function(object){
//             if(object.recipe_id === target_recipe) {
//                 return object.arc;
//             }
//             else {
//                 return null;
//             }
//         });
//         console.log(result);
//     }
//     ibCF.prototype.init = function() {
//         const LinkedList = require('./public/js/linked_list'),
//           setTable = function(table,count) {
//               if(count > 0) {
//                   table.push(new LinkedList());
//                   return setTable(table,count-1);
//               }
//               return table;
//           };
//         var $ = null,
//             recipe_table = [];
//         recipe_table = setTable(recipe_table,10);
//         $ = cheerioLoad(readFile('recipe_data.xml'));
//         $('row').each(function() {
//             var recipe_id = $(this).find('RECIPE_ID').text(),
//                 ingrd = [];
//             var recipe_info ={
//                 recipe_id : recipe_id,
//                 prime_count: 0,
//                 sub_count: 0, 
//                 total_count: 0,
//                 ingrd: ingrd
//             };
//             recipe_table[recipe_id % 10].append(recipe_info);
//         });

//         $ = cheerioLoad(readFile('ingrd_data.xml'));
//         $('row').each(function() {
//             var recipe_id = $(this).find('RECIPE_ID').text(),
//                 ingrd_name = $(this).find('IRDNT_NM').text(),
//                 type_code = $(this).find('IRDNT_TY_CODE').text();
//             var target_table = recipe_table[recipe_id % 10]._head;
//             while(target_table.next) {
//                 target_table = target_table.next;
//                 var data = target_table.data;
//                 if(data.recipe_id === recipe_id) {
//                     data.total_count += 1;
//                     type_code === '3060001' ? 
//                     data.prime_count += 1 :
//                     data.sub_count += 1;
//                     data.ingrd.push({ingrd_name: ingrd_name,type_code: type_code});
//                     break;
//                 }
//             }
//         });
//         var result_file = JSON.stringify(recipe_table);
//         fs.writeFileSync(__dirname+'/public/ingrd.json',result_file,'utf-8');

        
//     const LinkedList = require('./public/js/linked_list'),
//     Graph = require('./public/js/Graph'),
//     result_table = [],
//     setTable = function(table,count) {
//         if(count > 0) {
//             table.push(new LinkedList());
//             return setTable(table,count-1);
//         }
//         return table;
//     },readFile = function(result,path,json) {
//       result = fs.readFileSync(__dirname+path,'utf-8',(err,data)=>{
//           if(err) {
//               throw err;
//           }
//       });
//       result = json(result);
//       return result;
//   },jsonParse = function(data) {
//       return JSON.parse(data);
//   },loopNode = function(target) {
//       return function(other){
//           while(other.next) {
//               other = other.next;
//               var counting; 
//               counting = weightCalc(target.data,other.data);
//               assignWeight(target.data,other.data,counting)
//           }
//       }
//   },weightCalc = function(target,compared) {
//       /* @param target 레시피 테이블의 데이타 objec
//                 target prime_count, sub_count, total_count, ingrd {}
//                 compared 비교 대상 레시피 테이블의 데이타 object {recipe_id ...}
//       */
//      const prime = '3060001';
//      let pp_count = 0,
//          ss_count = 0;

//      target.ingrd.forEach((Tvalue) => {
//          compared.ingrd.forEach((Cvalue) => {
//           if(Tvalue.ingrd_name === Cvalue.ingrd_name){
//               if(Tvalue.type_code === prime && Cvalue.type_code === prime) {
//                   pp_count += 1;
//               } else {
//                   ss_count +=1;
//               }
//           }
//          })
//      });
//      return {
//          p_count : pp_count,
//          s_count : ss_count
//      };
//   },assignWeight = function(target,compared,counting) {
//       /* @param target 레시피 테이블의 데이타 object
//                 target prime_count, sub_count, total_count, ingrd {}
//                 compared 비교 대상 레시피 테이블의 데이타 object {recipe_id ...}
//       */
//       var weight = 0,
//           prime_weight = 0,
//           sub_weight= 0;
//       prime_weight = (counting.p_count)/(compared.prime_count) * 7;
//       sub_weight = (counting.s_count)/(compared.sub_count) * 3;
//       weight = ((prime_weight + sub_weight)*0.1).toFixed(2);
//       graph.insertTwoWayArc(graph,weight,target.recipe_id,compared.recipe_id);
//   };
// let recipe_table = [],
//   graph = new Graph();
// recipe_table = readFile(recipe_table,'/public/ingrd.json',jsonParse);
// for(var i = 0;i<10;i++) {
//   var cur = recipe_table[i]._head;
//   while(cur.next) {
//       cur = cur.next;
//       graph.insertVertex(cur.data.recipe_id,0);
//   }
// }
// for(var i = 0;i<10;i++) {
//   var target = recipe_table[i]._head;
//   while(target.next) {
//       target = target.next;
//       var self_line = target;
//       loopNode(target)(self_line);
//       //본인 줄이 끝나면
//       for(var j=i+1;j<10;j++) {
//           var other_line = recipe_table[j]._head;
//           loopNode(target)(other_line);

//       }
//   }
// }
// var write_data = graph.getArcObject(function(arc,temp_obj,max) {
// var arc_key = arc.destination.key,
//     arc_data = arc.data,
//     temp_result = {
//         arc_recipe_id: arc_key,
//         arc_key: arc_data
//     },temp_arc = temp_obj['arc'];
//     if(max < arc_data) {
//         max = arc_data;
//         if(temp_obj['arc'].length === 0) {
//           temp_arc.push(temp_result);
//         } else {
//           temp_arc.push(temp_result);
//         } 
//     }
//   return max;
// });
// console.log(JSON.stringify(write_data));
// fs.writeFileSync(__dirname+'/public/item_based_CF.json',JSON.stringify(write_data),'utf-8');

//     }
//     return ibCF;
// })();

// /* 
// var request = require('request');
// var url = "https://dweet.io/get/latest/dweet/for/lee_two_song";
// request.get({
//     url: url,
//     type: 'json'
// },(err,response,body) => {
//     if(err) {
//         throw err;
//     }
//     console.log(JSON.parse(body).with[0].content);
// })
//  */

// new Promise((resolve,reject) => {
//     var DataBase = require('./public/js/DataBase'),
//     db = new DataBase(),
//     arr_user = [];
// var query = 'select * from user_recipe';
// var find = function(arr,predi) {
//     for(var i = 0,len=arr.length;i<len;i++)
//     {
//         if(predi(arr[i])) return i;
//     }
//     return -1;
// }
//     db.query(query,null).then((row) => {
//         db.close().catch((err) => {
//             reject(err);
//             if(err) {
//                 throw err;
//             }
//         });
    
//         row.forEach((value) => {
//             var data = {
//                 recipe_id: null,
//                 count : null
//             },  user_data = {
//                 name: null,
//                 data: [],
//             },compareValue = function(value){
//                 return function(target) {
//                     return (target.name === value);
//                 }
//             };
//             var index = find(arr_user,compareValue(value.user_id));
//             if(index === -1) {
//                 user_data['name'] = value.user_id;
//                 data['recipe_id'] = value.recipe_id;
//                 data['count'] = value.count;
//                 user_data['data'].push(data);
//                 arr_user.push(user_data);
//             } else {
//                 data['recipe_id'] = value.recipe_id;
//                 data['count'] = value.count;
//                 arr_user[index].data.push(data);
//             }
//         });
//         resolve(arr_user);
//     }).catch((err) => {
//         if(err) {
//             throw err;
//         }
//     })
// }).then((arr_user) => {
//     var UBCF = require('./public/js/UBCF'),
//         ubcf = new UBCF();
//     ubcf.execute(arr_user,'dygmm4288');
// })
/* const fs = require('fs'),
      apikey = "445710056000a912b0f0477e477bf326e4b0e2e2f4b69a087f2100f6b980d681",
      axios = require('axios'),
      address = [];
let url = `http://211.237.50.150:7080/openapi/${apikey}/xml/Grid_20150827000000000226_1/`,
    start = 21,
    end = 537;
var i = start;
while(i<end) {
    address.push(url+`${i}/${i+20}`);
    i += 20;
}   
const crawler = async() => {
    await Promise.all(address.map(async(r) => {
        const response = await axios.get(r);
        if(response.status === 200) {
            const xml = response.data;
            fs.appendFile(__dirname+'/test.xml',xml,'utf-8',(err) => {
                if(err) {
                    throw err;
                }
                console.log('appending success');
            });
        } else {
            console.log('crawler error');
        }
    }))
}
crawler(); */
const database = require('./public/js/DataBase'),
      db = new database();
const select = async (query,args) => {
    let result = null;
    await db.query(query,args).then((row) => {
        result = row;
    }).catch((err)=>{
        if(err) {
            throw err;
        }
    });
    return result;
}, diffTime = function(cur,last) {
    let result = null;
    result = (cur-last)/(1000*60);
    return result;
}, findSensor = function(cur) {
    
}, checkSensor = (cur) => {
    let start_time = new Date();
    setTimeout(()=>{
        let query = "select * from sensor order by 'time' desc",
            diff_time = null;
        select(query,null).then((row) => {
            let sensor_id = null,
                last_time = new Date();
            for(var i = 0,len = row.length;i<len;i++)
            {
                let temp_time = new Date(row[i].time);
                diff_time = diffTime(start_time,temp_time);
                console.log(row[i].sensor_id, diff_time);
                if(diff_time < 2 && diff_time > 0) {
                    sensor_id = row[i].time;
                    break;
                }
            }
            console.log('cur - last',diffTime(last_time,cur))
            if(sensor_id !== null) {
                console.log('first if');
                return sensor_id;
            }
            else if(diffTime(last_time,cur) > 0.5) {
                console.log('second if');
                return sensor_id;
            } 
            else {
                checkSensor(cur);
            }
        })
    },5000);
};
let current_time = new Date();
checkSensor(current_time);
