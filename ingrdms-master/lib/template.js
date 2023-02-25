module.exports = {
    HTML: function(title, body,js){
        return `<html>
        <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/css/index.css" />
        <title>${title}</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script> 
    </head>
    <body>
      ${body}
      <script type = "text/javascript">${js}</script>
    </body>

</html>`
    }
}