function setup() {
    //initial load of data
		createCanvas(1000,1000);
    loadJSON('https://api.apixu.com/v1/current.json?key=796d7f2a8ee74e058e4181900180812&q=santa-cruz-california-united-states-of-america',gotData);
}

let weather;

function gotData(data){
    //sets data to weather var
    weather = data;
}

function draw() {
    //refresh data every minute
    if(frameCount % 3600===0){
       loadJSON('https://api.apixu.com/v1/current.json?key=796d7f2a8ee74e058e4181900180812&q=santa-cruz-california-united-states-of-america',gotData);
    }
    
    //draws gradient
    drawBackground();
    
    if(weather){
        fill(255);
        textSize(30);
        
        //split date and time
        let time = weather.location.localtime.split(" ");
        text(time[1],900,50);
        let timeW = textWidth(time[1]);
        //split date for proper formatting
        let date = time[0].split("-");
        //concatinate dates with slashes
        let newDate = date[1]+"/"+date[2]+"/"+date[0];
        let dateW = textWidth(newDate);
        text(newDate,20,50);
        textSize(80);
        
        //divider lines
        stroke(255);
        strokeWeight(3);
        line(230,230,790,230);
        line(230,430,790,430);
        strokeWeight(1);
        line(15,55,15+dateW+10,55);
        line(895,55,895+timeW+10,55);
        noStroke();
        
        //display location
        textFont('Montserrat Thin');
        text(weather.location.name,300,200);
        
        //display temperatrue
        textSize(200);
        textFont('Montserrat Light');
        let temp = round(weather.current.temp_f)
        var tWidth = textWidth(temp);
        text(temp,385,400);
        textSize(60);
        text("°F",385+tWidth,300)
        
        //display other stats
        textFont('Montserrat Thin');
        text("Condition:\t"+weather.current.condition.text+
        "\nWind:\t"+weather.current.wind_mph
        +"mph"+"\nVisibility:\t"+weather.current.vis_miles+" miles"
        +"\nHumidity:\t"+weather.current.humidity+"%"
        +"\nRain:\t"+weather.current.precip_in+" inches",250,500);
    }
}

function drawBackground(){
    noStroke();
    if(weather){
        for(let i = 0; i < 500; i++){
            //if daytime show light theme
            if(weather.current.is_day==1)
                fill(50+i/4,10+i/2,250);
            //if nighttime show dark theme
            else
                fill(i/2,i/5,100);
            rect(0,i*2,1000,2);
        }
    }
}