    //Check Init Data 
    const cheerio = require('cheerio'),
          fs = require('fs');
    let recipe_table = null;
    //Init Data
    if(true){
        
    const list = require('./public/js/linked_list'),
          Data = require('./public/js/recipe.js')(),
          initTable = function(table,count) {
            if(count > 0) {
                table.push(new list());
                return initTable(table,count-1);
            }
            else {
                return table;
            }
        };
    let $ = null,
        query = null,
        ingrd_list = new Array(),
        util = require('util');
    recipe_table = new Array();

    recipe_table = initTable(recipe_table,10);

    $ = cheerio.load(fs.readFileSync(__dirname+'/public/recipe_data.xml','utf-8'),{xmlMode:true});
    $('row').each(function() {
        let recipe_id = $(this).find('RECIPE_ID').text(),
            recipe_name = $(this).find('RECIPE_NM_KO').text(),
            type_code = $(this).find('NATION_CODE').text(),
            cooking_time = $(this).find('COOKING_TIME').text(),
            level = $(this).find('LEVEL_NM').text(),
            img_url = $(this).find('IMG_URL').text(),
            classify_code = $(this).find('TY_CODE').text(),
            amount = $(this).find('QNT').text();
        recipe_table[recipe_id % 10].append(new Data.Recipe(recipe_id,recipe_name,type_code,classify_code,cooking_time,amount,level,img_url));
    });
    $ = cheerio.load(fs.readFileSync(__dirname+'/public/ingrd_data.xml','utf-8'),{xmlMode: true});
    $('row').each(function(){
        let recipe_id = $(this).find('RECIPE_ID').text(),
            ing_name = $(this).find('IRDNT_NM').text(),
            ing_amount = $(this).find('IRDNT_CPCTY').text(),
            ing_ty_code = $(this).find('IRDNT_TY_CODE').text(),
            cur = null;

        ingrd_list.push(new Data.Ingredient(recipe_id,ing_name,ing_amount,ing_ty_code));
        cur = recipe_table[recipe_id%10]._head;
        while(cur.next)
        {
            cur = cur.next;
            if(cur.data.recipe_id === recipe_id)
            {
                cur.data.count_ingrd++;
            }
        }
    });

    console.log('왜 안돼');
        var data = fs.readFileSync('./public/ingrd_data.json','utf-8',(err,data) => {
            console.log('읽깋나냐?')
            if(err) {
                throw err;
            }
        })
        data = JSON.parse(data);
        console.log(data);
    } else {    //exist init

    }