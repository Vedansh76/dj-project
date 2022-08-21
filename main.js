song2="";
song1="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
khariyat = "";
Tujhe_kitna_chane_lage_hum = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    song1 = loadSound("m1.mp3");
    song2 = loadSound("m2.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    khariyat = song1.isPlaying();
    console.log(khariyat);

    Tujhe_kitna_chane_lage_hum = song2.isPlaying();
    console.log(Tujhe_kitna_chane_lage_hum);

    if(scoreleftWrist > 0.002){
        circle(leftWrist_x,leftWrist_y,20);
       song2.stop();
        if(khariyat == false){
            song1.play();
        }
        else{
            console.log("Song Name: Khariyat");
            document.getElementById("song_id").innerHTML = "Song Name: Khariyat";
        }
    }

    if(scorerightWrist > 0.002){
        circle(rightWrist_x,rightWrist_y,20);
        song1.stop();
        if(Tujhe_kitna_chane_lage_hum == false){
            song2.play();
        }
        else{
            console.log("Song Name: Tujhe_kitna_chane_lage_hum");
            document.getElementById("song_id").innerHTML = "Song Name:Tujhe_kitna_chane_lage_hum";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}