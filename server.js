const http = require('http').createServer(servidor);
const fs = require('fs');
const porta = 8000;
const five = require('johnny-five');
const arduino = new five.Board();
var led1, led2;

arduino.on('ready', function() {
    console.log("Arduino Pronto");
    led1 = new five.Led(12);
    led2 = new five.Led(13);
});

function servidor(req, res) {
  switch(req.url) {
    case '/':
        res.writeHead(200);
        // carregar página html  
        res.end(fs.readFileSync('view/index.html'));
        break;
    case '/led1':
        // voltar para a página index  
        res.writeHead(302, {'Location': '/'});
        res.end();
        console.log("Led 1 mudado");
        led1.toggle();
        break;
    case '/led2':
        // voltar para a página index 
        res.writeHead(302, {'location': '/'});
        res.end();
        console.log("Led 2 mudado");
        led2.toggle();
        break;
    default:
        res.writeHead(200);
        res.end("<h1>Erro 404</h1>");
  }
};

http.listen(porta, function() {
  console.log(`Servidor executando na porta ${porta}`);
});
