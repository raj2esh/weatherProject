const http = require("http");
const request = require("request")
const fs = require("fs")

const mainfile = fs.readFileSync('index.html',"utf8");

const server = http.createServer((req, res) => {
	if (req.url == '/') {
		request("https://api.openweathermap.org/data/2.5/weather?q=madhubani&appid=113138330f2b5d737b7158ede0b0fc23")
		.on("data",(chunk)=>
		{
			const object=JSON.parse(chunk);
			const arrdata=[object];
			console.log((arrdata[0].name));
			myweatherstat='<i class="fa-solid fa-cloud" style="font-size: 100px; color: grey;"></i>';
			let realtime=mainfile.replace(
				"{%temperature%}",((arrdata[0].main.temp-273.15).toFixed(1)+"°C")).replace("{%city%}",arrdata[0].name)
				.replace("{%weathericon%}",myweatherstat)
			

			res.end(realtime,"utf-8")
			res.end(realtime,"utf-8")
		})
		.on("end",(err)=>{
			// if(err) throw err;
			res.end("ended successfully");
			
		})
	}
})

server.listen(8000,()=>
{
	console.log("Server running at port 8000");
})