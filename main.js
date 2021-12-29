video="";
status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center(); 
}

function draw(){
    image(video,0,0,480,380);
    if(status != "")

    { 
        objectdetector.detect(video, gotResult);
        for (i = 0; i<objects.length;i++) {
            document.getElementById("status").innerHTML ="status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML ="Number of objects detected are :"+objects.length;
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + "" +percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }    
}
}

function gotResult(error, results){
    if (error) {
        console.log(error); 
    }
    console.log(results);
    objects = results;
}

function start(){
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
} 